import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Comment } from '../comment';

import { HackerNewsService } from '../hacker-news.service';
import { News } from '../news';

@Component({
  selector: 'app-news-discuss',
  templateUrl: './news-discuss.component.html',
  styleUrls: ['./news-discuss.component.css']
})
export class NewsDiscussComponent implements OnInit {
  public story: News | null = null;
  public hasError: boolean = false;
  public commText: string = '';

  constructor(
    public hackerNews: HackerNewsService,
    private route: ActivatedRoute) {

    this.route.paramMap
      .pipe
      (
        switchMap(params => {
          let id = parseInt(params.get('id')!, 10);
          return this.hackerNews.getNewsById(id);
        })
      )
      .subscribe(
        x => this.story = x,
        e => this.hasError = true);
  }

  ngOnInit(): void {
  }

  onAddComm(): void {
    if (this.story) {
      let newComm: Comment = {
        by: 'anonymous',
        id: Math.floor(Math.random() * 1000) + this.story.id,
        parent: this.story.id,
        text: this.commText,
        type: 'comment',
        time: new Date().getTime() / 1000,
      }

      this.hackerNews.setItemById(newComm.id, newComm)
        .subscribe(x => {
          if (this.story && this.story.kids) {
            this.story.kids = [x, ...this.story.kids];
          } else if (this.story) {
            this.story.kids = [x];
          }
          this.commText = '';
        });
    }
  }
}
