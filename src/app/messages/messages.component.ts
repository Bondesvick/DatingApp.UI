import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Message } from '../_models/message';
import { Pagination } from '../_models/pagination';
import { MessageService } from '../_services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
messages: Message[] = [];
pagination!: Pagination;
container = 'Unread';
pageNumber = 1;
pageSize = 5;
totalItems = 100;
loading = false

displayedColumns: string[] = ['content', 'name', 'time', 'delete'];

  constructor( private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadMessages()
  }

  loadMessages(){
    this.loading = true;
    this.messageService.getMessages(this.pageNumber, this.pageSize, this.container)
    .subscribe(response => {
      this.messages = response.result;
      this.pagination = response.pagination;
      this.totalItems = response.pagination.totalItems;
      this.loading = false;
    })
  }

  pageChanged(event: PageEvent){
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadMessages();
  }


  filterMessages(predicate: string){
    this.container = predicate;
    this.loadMessages();
  }

  deleteMessage(id: number){
    //console.log(id);
    this.messageService.deleteMessage(id).subscribe(() =>{
      this.messages = this.messages.filter(m => m.id !== id);
      //this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
    })
  }
}
