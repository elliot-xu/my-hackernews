import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsDiscussComponent } from './news-discuss/news-discuss.component';
import { NewsListComponent } from './news-list/news-list.component';

const routes: Routes = [
  {path: 'newslist', component: NewsListComponent},
  {path: 'newsdiscuss/:id', component: NewsDiscussComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
