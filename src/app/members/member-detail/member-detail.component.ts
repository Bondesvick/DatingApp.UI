import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Member } from 'src/app/_models/member';
import { Message } from 'src/app/_models/message';
import { MembersService } from 'src/app/_services/members.service';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {
@ViewChild(MatTabGroup, {static: true}) matTabGroup!: MatTabGroup;
tabIndex: number = 0;

  member!: Member;

  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[]  =[];

  messages: Message[]= [];

  constructor(private memberService: MembersService, private route: ActivatedRoute,
    private messageService: MessageService) { }

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
      this.loadMessages();
    }
  }

}
