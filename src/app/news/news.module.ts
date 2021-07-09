import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { HackerNewsService } from './hacker-news.service';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsDiscussComponent } from './news-discuss/news-discuss.component';
import { NewsStoryComponent } from './news-shared/news-story.component';
import { NewsCommentComponent } from './news-shared/news-comment.component';
import { NewsDetailWrapperComponent } from './news-discuss/news-discuss-wrapper.component';
import { TimeAgoPipe } from './news-time.pipe';


@NgModule({
  declarations: [
    NewsListComponent,
    NewsDiscussComponent,
    NewsStoryComponent,
    NewsCommentComponent,
    NewsDetailWrapperComponent,
    TimeAgoPipe
  ],
  imports: [
    CommonModule,
    NewsRoutingModule
  ],
  providers: [HackerNewsService]
})
export class NewsModule { }
