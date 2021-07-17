import { Component, Input, OnChanges, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { from } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';

import { HackerNewsService } from '../hacker-news.service';
import { NewsCommentComponent } from './news-comment.component';
import { Comment } from '../comment';
import { NewsCommentNofity } from '../news-comment-notify.service';

@Component({
    selector: 'app-news-comment-wrapper',
    templateUrl: './news-comment-wrapper.component.html',
    providers: [NewsCommentNofity]
})
export class NewsCommentWrapperComponent implements OnChanges {
    @Input() storyIds!: number[];
    @ViewChildren('comments') comments!: QueryList<NewsCommentComponent>;
    public storyComments: Comment[] = [];

    constructor(
        private hackerNews: HackerNewsService,
        private commentNotify: NewsCommentNofity) {
            this.commentNotify.missionAnnounced$.subscribe(
                _ => {
                    this.comments.notifyOnChanges();
                }
            );
    }

    ngOnChanges(changes: SimpleChanges): void {
        for (const prop in changes) {
            if (prop === 'storyIds' && changes[prop].currentValue) {
                this.getComments(changes[prop].currentValue);
            }
        }
    }

    getComments(ids: number[]) {
        this.storyComments = [];
        from(ids)
            .pipe
            (
                mergeMap(x => this.hackerNews.getCommentById(x)),
                filter(x => !x.deleted)
            )
            .subscribe(x => {
                this.storyComments.push(x);
            });
    }
}
