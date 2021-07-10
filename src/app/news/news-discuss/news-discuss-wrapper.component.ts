import { Component, Input, OnChanges, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { of } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';

import { HackerNewsService } from '../hacker-news.service';
import { NewsCommentComponent } from '../news-shared/news-comment.component';
import { Comment } from '../comment';

@Component({
    selector: 'app-news-discuss-wrapper',
    templateUrl: './news-discuss-wrapper.component.html'
})
export class NewsDetailWrapperComponent implements OnChanges {
    @Input() storyIds!: number[];
    public storyComments: Comment[] = [];
    @ViewChildren('comments') comments!: QueryList<NewsCommentComponent>;

    constructor(
        public hackerNews: HackerNewsService) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        for (const prop in changes) {
            if (prop === 'storyIds') {
                this.getComments();
            }
        }
    }

    getComments() {
        of(this.storyIds)
            .pipe
            (
                mergeMap(x => x.map(v => v)),
                mergeMap(x => this.hackerNews.getCommentById(x)),
                filter(x => !x.deleted)
            )
            .subscribe(x => this.storyComments.push(x));
    }
}
