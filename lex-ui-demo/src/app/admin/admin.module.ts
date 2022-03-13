import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MessageListComponent } from './message-list/message-list.component';



@NgModule({
  declarations: [
    AdminComponent,
    MessageListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  exports: [MessageListComponent]
})
export class AdminModule { }
