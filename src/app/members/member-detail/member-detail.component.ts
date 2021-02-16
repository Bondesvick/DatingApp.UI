import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { Message } from 'src/app/_models/message';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { MessageService } from 'src/app/_services/message.service';
import { PresenceService } from 'src/app/_services/presence.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit, OnDestroy {
@ViewChild(MatTabGroup, {static: true}) matTabGroup!: MatTabGroup;
tabIndex: number = 0;

  member!: Member;

  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[]  =[];

  messages: Message[]= [];
  user!: User;

  constructor(public presence: PresenceService, 
    private route: ActivatedRoute,
    private messageService: MessageService,
    private accountservice: AccountService) { 
      this.accountservice.currentUser$.pipe(take(1)).subscribe(user => {
        this.user = user;
      })
    }

  ngOnInit(): void {
    //this.loadMember();
    
    this.route.data.subscribe(data => {
      this.member = data.member;
    });

    this.route.queryParams.subscribe(params => {
      params.tab ? this.changeTab(params.tab) : this.changeTab(0);
    });

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ]

    this.galleryImages = this.getImages();
    this.checkTab();
  }

  getImages(): NgxGalleryImage[]{
    const imageUrls = [];
    for(const photo of this.member.photos){
      imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url
      }) 
    }
    return imageUrls;
  }


  // loadMember(){
  //   this.memberService.getMember(this.route.snapshot.paramMap.get('userName')!).subscribe(member => {
  //     this.member = member;
  //     this.galleryImages = this.getImages();
  //   })
  // }

  loadMessages(){
    this.messageService.getMessageThread(this.member.userName).subscribe(messages => {
      this.messages = messages;
    })
  }

  changeTab(index: number){
    this.tabIndex = index;
    this.matTabGroup.selectedIndex = index
    this.checkTab()
  }

  checkTab(){
    this.tabIndex = this.matTabGroup?.selectedIndex || 0;

    if(this.matTabGroup?.selectedIndex === 3 && this.messages.length === 0){
      this.messageService.createHubConnection(this.user,this.member.userName );
      //this.loadMessages();
    } else{
      this.messageService.stopHubConnection();
    }
  }

  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }

}
