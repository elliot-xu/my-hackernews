import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Comment } from '../comment';
import { News } from '../news';
import { HackerNewsService } from '../hacker-news.service';

@Component({
  selector: 'app-news-discuss',
  templateUrl: './news-discuss.component.html',
  styleUrls: ['./news-discuss.component.css']
})
export class NewsDiscussComponent implements OnInit {
  public story: News | null = null;
  public hasError: boolean = false;

  constructor(
    private hackerNews: HackerNewsService,
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

  onAddComm(commText: string): void {
    if (this.story) {
      this.hackerNews.setItemById(this.story.id, commText)
        .subscribe(x => {
          if (this.story && this.story.kids) {
            this.story.kids = [x, ...this.story.kids];
          } else if (this.story) {
            this.story.kids = [x];
          }
        });
    }
  }
}
