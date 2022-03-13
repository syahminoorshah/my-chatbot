import { Component, OnInit, Input, inject, Inject } from '@angular/core';
import { Interactions } from 'aws-amplify';
import { ConversationService } from '../services/conversation.service';
import { IdentityServiceService } from '../services/identity-service.service';
import { MessageInterface } from './message-interface';



@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.css']
})
export class ChatBotComponent implements OnInit {

  constructor(
    public identityService: IdentityServiceService,
    private conversationService: ConversationService
  ) {
    this.identityService.buildContext();
  }

  showChatArea = false;

  title = 'aws-demo-chatbot';
  conversation: string = '';
  message: any;

  showTypingIndicator = false;

  attachment: any;

  messagesList: MessageInterface[] = [];

  currentResponse: any = null;
  email: any = null;
  phone: any = null;
  name: any = null;
  // area: any = null;
  // hospital: any = null;
  // brand: any = null;
  // dept: any = null;
  // filters : any = {
  //   "Kuala Lumpur": [
  //     //List of Hospital
  //     "GLENEAGLES", "Gleneagles",
  //     'Test', "Test2"
  //   ]
  // }

  quickMessages = ['Having Issues', 'Software Breakdown'];


  ngOnInit(): void {
    this.conversationService.loadContextualMessages().subscribe(data => {
      this.messagesList = data;
    });
  }

  pickAttachment(e: any) {
    this.attachment = e.target.files[0];
  }

  async startChat() {
    
    if (!this.message) {
     
      if(this.attachment){
        this.uploadAttachment();
      }
     
      return;
    }
    // console.log(this.area, (this.area && this.filters[this.area]  && this.filters[this.area].indexOf(this.message) < 0));
    
    // if(this.area && this.filters[this.area] && this.filters[this.area].indexOf(this.message) < 0){
    //   this.messagesList.push({
    //     textMessage: "Ahh i think the info is wrong",
    //     type: 'bot'
    //   });
    //   return;
    // }

    this.currentResponse = null;
    this.messagesList.push({
      textMessage: this.message,
      type: 'user'
    });

    let text = this.message;

    this.message = "";
    this.showTypingIndicator = true;

    var response = await Interactions.send("BookTrip_dev", text!.toString());

    if (response && response['message']) {


      this.currentResponse = response;
      this.conversationService.storeMessage({
        'user_message': text,
        'bot_reply': response['message'],
        'identity_token': localStorage.getItem('id'),
        'attachment': this.attachment
      }).subscribe(() => {
        this.showTypingIndicator = false;
        this.messagesList.push({
          textMessage: response['message'],
          type: 'bot'
        });
        this.attachment = null;
        this.conversationService.loadContextualMessages().subscribe(data => {
          this.messagesList = data;
        });
      });
    }

    if (response['dialogState'] == "Fulfilled"){
      let slot = response['slots'];
      
      slot['identity_token'] = localStorage.getItem('id');

        this.identityService.updateIdentity(slot).subscribe(data => {
          // this.area = slot.Area;
        });
        

    }

    // if(response['slots'] && response['slots'].Area){
      
      
    //   this.area = response['slots'].Area;
    // }
  }

  toggleChatArea() {
    this.showChatArea = !this.showChatArea;
  }

  chooseSelection(text: any) {
    this.message = text;
    this.startChat();
  }

  uploadAttachment(){
    this.conversationService.storeMessage({
      'user_message': "Attachment",
      'bot_reply': '',
      'identity_token': localStorage.getItem('id'),
      'attachment': this.attachment
    }).subscribe(() => {
      this.attachment = null;
      this.conversationService.loadContextualMessages().subscribe(data => {
        this.messagesList = data;
      });
    });
  }
}
