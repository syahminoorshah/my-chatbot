import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatBotComponent } from './chat-bot.component';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import Amplify, { Interactions } from 'aws-amplify';

Amplify.configure({
  Auth: {
    identityPoolId: 'us-east-1:165799a3-d545-4415-b495-91947fff1d3c',
    region: 'us-east-1'
  },
  Interactions: {
    bots: {
      "BookTrip_dev": {
        "name": "BookTrip_dev",
        "alias": "$LATEST",
        "region": "us-east-1",
      },
    }
  }
});

@NgModule({
  declarations: [
    ChatBotComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule
  ],
  exports: [
    ChatBotComponent
  ]
})
export class ChatBotModule { }
