import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConversationService } from 'src/app/services/conversation.service';



@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  constructor(
    private service: ConversationService
  ) { }
    allMessages: any = [];

  ngOnInit(): void {
    this.service.loadMessages().subscribe((data) => {
      this.allMessages = data;
    })
  }

}
