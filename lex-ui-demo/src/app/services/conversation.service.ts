import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private http: HttpClient) { }


  storeMessage(message: any) {
    var myFormData = new FormData();
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    myFormData.append('user_message', message.user_message);
    myFormData.append('bot_reply', message.bot_reply);
    myFormData.append('identity_token', message.identity_token);
    myFormData.append('attachment', message.attachment);
    return this.http.post<any>('http://127.0.0.1:8000/api/store-message', myFormData, {
      headers: headers
    });
  }

  loadContextualMessages() {
      return this.http.get<any>('http://127.0.0.1:8000/api/contextual-conversation/' + localStorage.getItem('id'));
  }

  loadMessages(){
    return this.http.get<any>('http://127.0.0.1:8000/api/messages');
  }

}
