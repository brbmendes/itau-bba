import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TalkRequestsComponent } from './talk-requests/talk-requests.component';

const routes: Routes = [
  { path: 'talk', component: TalkRequestsComponent, pathMatch: 'full' },
  { path: "**", component: TalkRequestsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
