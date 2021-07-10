import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { HackerNewsService } from './hacker-news.service';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsDiscussComponent } from './news-discuss/news-discuss.component';
import { NewsStoryComponent } from './news-shared/news-story.component';
import { NewsCommentComponent } from './news-shared/news-comment.component';
import { NewsDetailWrapperComponent } from './news-discuss/news-discuss-wrapper.component';
import { NewsErrorComponent } from './news-shared/news-error.component';
import { NewsTitleDirective } from './news-directive/news-title.directive';
import { TimeAgePipe } from './news-pipe/news-timeage.pipe';
import { FormatPointPipe } from './news-pipe/news-formatpoint.pipe';
import { ExtractDomainPipe } from './news-pipe/news-extractdomain.pipe';
import { FormatCommentPipe } from './news-pipe/news-formatcomm.pipe';
import { HideCommentPipe } from './news-pipe/news-hidecomm.pipe';


@NgModule({
  declarations: [
    NewsListComponent,
    NewsDiscussComponent,
    NewsStoryComponent,
    NewsCommentComponent,
    NewsDetailWrapperComponent,
    NewsErrorComponent,
    NewsTitleDirective,
    TimeAgePipe,
    HideCommentPipe,
    FormatPointPipe,
    ExtractDomainPipe,
    FormatCommentPipe
  ],
  imports: [
    CommonModule,
    NewsRoutingModule
  ],
  providers: [HackerNewsService]
})
export class NewsModule { }
