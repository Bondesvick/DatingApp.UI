import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Member } from '../_models/member';
import { Pagination } from '../_models/pagination';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {
members!: Partial<Member[]>;
predicate = 'liked';
pageNumber = 1;
pageSize = 5;
totalItems = 100;
pagination!: Pagination;

  constructor(private memberService: MembersService) { }

  ngOnInit(): void {
    this.loadLikes();
  }

  loadLikes(){
    //console.log(this.predicate)
    this.memberService.getLikes(this.predicate, this.pageNumber, this.pageSize).subscribe(response => {
      this.members = response.result;
      this.pagination = response.pagination;
      this.totalItems = response.pagination.totalItems;
    })
  }

pageChanged(event: PageEvent){
  this.pageNumber = event.pageIndex + 1;
   this.pageSize = event.pageSize;
   this.loadLikes();
}

  filterLikes(predicate: string){
    this.predicate = predicate;
    this.loadLikes();
    //console.log(this.predicate)
  }
}
