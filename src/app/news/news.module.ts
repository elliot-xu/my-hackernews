import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NewsRoutingModule } from './news-routing.module';
import { HackerNewsService } from './hacker-news.service';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsDiscussComponent } from './news-discuss/news-discuss.component';
import { NewsStoryComponent } from './news-shared/news-story.component';
import { NewsCommentComponent } from './news-shared/news-comment.component';
import { NewsCommentWrapperComponent } from './news-shared/news-comment-wrapper.component';
import { NewsErrorComponent } from './news-shared/news-error.component';
import { NewsTitleDirective } from './news-directive/news-title.directive';
import { TimeAgePipe } from './news-pipe/news-timeage.pipe';
import { FormatPointPipe } from './news-pipe/news-formatpoint.pipe';
import { ExtractDomainPipe } from './news-pipe/news-extractdomain.pipe';
import { FormatCommentPipe } from './news-pipe/news-formatcomm.pipe';
import { HideCommentPipe } from './news-pipe/news-hidecomm.pipe';
import { NewsLocalCacheStore } from './news-local-cache-store.service';
import { NewsAddCommentComponent } from './news-shared/news-add-comment.component';


@NgModule({
  declarations: [
    NewsListComponent,
    NewsDiscussComponent,
    NewsStoryComponent,
    NewsCommentComponent,
    NewsCommentWrapperComponent,
    NewsErrorComponent,
    NewsTitleDirective,
    NewsAddCommentComponent,
    TimeAgePipe,
    HideCommentPipe,
    FormatPointPipe,
    ExtractDomainPipe,
    FormatCommentPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    NewsRoutingModule
  ],
  providers: [
    HackerNewsService,
    NewsLocalCacheStore
  ]
})
export class NewsModule { }
