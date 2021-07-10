import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';

import { HackerNewsService } from '../hacker-news.service';
import { News } from '../news';

@Component({
  selector: 'app-news-discuss',
  templateUrl: './news-discuss.component.html',
  styleUrls: ['./news-discuss.component.css']
})
export class NewsDiscussComponent implements OnInit {
  public storyCommentIds: number[] = [];
  public story: News | undefined;
  public hasError: boolean = false;

  constructor(
    public hackerNews: HackerNewsService,
    private route: ActivatedRoute) {

    this.route.paramMap
      .pipe
      (
        switchMap(params => {
          let id = parseInt(params.get('id')!, 10);
          return this.hackerNews.getNewsById(id);
        }),
        tap(s => {
          this.storyCommentIds = s.kids ? s.kids : [];
        })
      )
      .subscribe(
        x => this.story = x,
        e => this.hasError = true);
  }

  ngOnInit(): void {
  }
}
