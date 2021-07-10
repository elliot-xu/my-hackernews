import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent, Observable, Subscriber } from 'rxjs';
import { mergeMap, map, debounceTime, filter, switchMap } from 'rxjs/operators';

import { HackerNewsService } from '../hacker-news.service';
import { News } from '../news';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {

  public stories: News[] = [];
  public hasError: boolean = false;
  storyPerPage: number = 15;
  type: string = 'top';

  scrollEvent$: Observable<number> =
    fromEvent(window, 'scroll')
      .pipe
      (
        map(_ => window.scrollY),
        filter(y => y >= document.body.clientHeight - window.innerHeight),
        debounceTime(200)
      );

  paramChanged$ =
    this.route.queryParamMap
      .pipe
      (
        map(x => x.get('type') ?? this.type)
      );

  initial$ = (type: string) => {
    switch (type) {
      case 'newest':
        return this.hackerNews.getNewStories();
      case 'ask':
        return this.hackerNews.getAskStories();
      case 'show':
        return this.hackerNews.getShowStories();
      case 'best':
        return this.hackerNews.getBestStories();
      case 'top':
      default:
        return this.hackerNews.getTopStories();
    }
  }

  producer = (totalStoryIds: number[]) => {
    let currentPage: number = 0;
    return (subscriber: Subscriber<number>) => {
      if (totalStoryIds) {
        const startIndex = currentPage * this.storyPerPage;
        for (let i = startIndex; Math.floor(i / this.storyPerPage) === currentPage && i < totalStoryIds.length; i++) {
          subscriber.next(totalStoryIds[i]);
        }
        currentPage++;
      }
    }
  }

  nextPage$ = new Observable<number>();

  constructor(
    public hackerNews: HackerNewsService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.paramChanged$
      .pipe
      (
        switchMap(x => this.initial$(x))
      )
      .subscribe(
        x => {
          this.nextPage$ = new Observable<number>(this.producer(x));
          this.stories = [];
          this.getMoreStories();
        },
        e => {
          this.hasError = true;
        });
  }

  getMoreStories() {
    this.nextPage$
      .pipe
      (
        mergeMap(id => this.hackerNews.getNewsById(id))
      ).subscribe(
        x => this.stories.push(x),
        e => {
          this.hasError = true;
        });
  }
}
