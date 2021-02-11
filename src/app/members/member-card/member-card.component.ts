import { Component, Input, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';
import { SnackBarService } from 'src/app/_services/snack-bar.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss']
})
export class MemberCardComponent implements OnInit {

@Input() member!: Member;

  constructor(private memberService: MembersService, private snackbar: SnackBarService) { }

  ngOnInit() {
  }

  addLike(member: Member) {
    //console.log(member.userName)
    this.memberService.addLike(member.userName).subscribe(() => {
      this.snackbar.openSnackBar('you have liked ' + member.nickName, 'success');
    })
  }

}
