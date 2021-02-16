import { Component, Input, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';
import { PresenceService } from 'src/app/_services/presence.service';
import { SnackBarService } from 'src/app/_services/snack-bar.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss']
})
export class MemberCardComponent implements OnInit {

@Input() member!: Member;

  constructor(private memberService: MembersService, 
    private snackbar: SnackBarService,
    public presence: PresenceService) { }

  ngOnInit() {
  }

  addLike(member: Member) {
    //console.log(member.userName)
    this.memberService.addLike(member.userName).subscribe(() => {
      member.liked = true;
      this.snackbar.openSnackBar('you have liked ' + member.nickName, 'success');
    })
  }

}
