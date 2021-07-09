import { AfterContentInit, Component, ContentChild, Input, OnInit, QueryList } from '@angular/core';
import { debounce } from 'rxjs/operators';
import { NewsDetailWrapperComponent } from '../news-discuss/news-discuss-wrapper.component';
import { Comment } from '../comment';
import { timer } from 'rxjs';

@Component({
  selector: 'app-news-comment',
  templateUrl: './news-comment.component.html',
  styleUrls: ['./news-comment.component.css']
})
export class NewsCommentComponent implements OnInit, AfterContentInit {
  @Input() storyComment!: Comment;
  @ContentChild('commentKids') childContainer: NewsDetailWrapperComponent | undefined;

  public subAmount: number = 1;
  hidden: boolean = false;

  constructor() {
  }

  ngAfterContentInit(): void {
    if (this.childContainer) {
      this.childContainer.comments.changes
        .pipe(
          debounce(()=> timer(300))
        )
        .subscribe(q => {
          this.subAmount = 1 + q.length;
          this.iterOverChildren(q);
        });
    }
  }

  iterOverChildren(children: QueryList<NewsCommentComponent> | undefined) {
    if (children) {
      for (const c of children) {
        if (c && c.childContainer) {
          this.subAmount += c.childContainer.storyIds.length;
          c.childContainer.comments.changes
            .pipe(
              debounce(()=> timer(300))
            )
            .subscribe(q => {
              this.childContainer?.comments.notifyOnChanges();
            });
          this.iterOverChildren(c.childContainer.comments);
        }
      }
    }
  }

  ngOnInit(): void {
  }

  onClickHide() {
    this.hidden = !this.hidden;
  }
}
