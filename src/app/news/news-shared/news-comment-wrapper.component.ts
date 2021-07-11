import { Component, Input, OnChanges, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { from } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';

import { HackerNewsService } from '../hacker-news.service';
import { NewsCommentComponent } from './news-comment.component';
import { Comment } from '../comment';

@Component({
    selector: 'app-news-comment-wrapper',
    templateUrl: './news-comment-wrapper.component.html'
})
export class NewsCommentWrapperComponent implements OnChanges {
    @Input() storyIds!: number[];
    @ViewChildren('comments') comments!: QueryList<NewsCommentComponent>;
    public storyComments: Comment[] = [];

    constructor(
        public hackerNews: HackerNewsService) {
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
