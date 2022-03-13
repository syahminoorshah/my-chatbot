import { NgModule } from '@angular/core';
import { ChildActivationEnd, RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ChatBotComponent } from './chat-bot/chat-bot.component';

const routes: Routes = [
  { path: '', component: ChatBotComponent},
  { path: 'dashboard', component: AdminComponent, loadChildren: () => import('./admin/admin.module').then((child) => child.AdminModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
