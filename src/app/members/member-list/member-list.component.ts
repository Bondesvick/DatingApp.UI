import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { MembersService } from 'src/app/_services/members.service';
import {PageEvent} from '@angular/material/paginator';
import {UserParams} from './../../_models/userParams'
import { AccountService } from 'src/app/_services/account.service';
import { take } from 'rxjs/operators';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  // members$!: Observable<Member[]>;
  members: Member[] = [];
  pagination!: Pagination;
  //pageNumber = 1;
  //pageSize = 10;
  totalItems = 100;

  userParams!: UserParams;
  user!: User;
  genderList = [{value: 'male', display: 'Males'},{value: 'female', display: 'Females'}]

  constructor(private memberService: MembersService) {
    this.userParams = memberService.getUserParams();
   }

  ngOnInit(): void {
   //this.members$ = this.memberService.getMembers();
   this.loadMembers(); 
  }

 loadMembers(){
   this.memberService.setUserParams(this.userParams);
   this.memberService.getMembers(this.userParams).subscribe(response => {
     //console.log(response)
     this.members = response.result;
     this.pagination = response.pagination;
     this.totalItems = response.pagination.totalItems;
   })
 } 

 resetFilters(){
   this.userParams = this.memberService.resetUserParams();
   this.userParams.pageNumber = 1;
   this.loadMembers();
 }

 filterOder(predicate: string){
   this.userParams.orderBy = predicate;
   this.loadMembers()
 }

 pageChanged(event: PageEvent){
   //this.totalItems = event.length;
   //this.pageSize = event.pageSize;
   //this.pageNumber = event.pageIndex + 1;

   this.userParams.pageNumber = event.pageIndex + 1;
   this.userParams.pageSize = event.pageSize;
   //this.userParams.
   this.memberService.setUserParams(this.userParams);
   //this.pageNumber = event.page;
   this.loadMembers();
 }


}
