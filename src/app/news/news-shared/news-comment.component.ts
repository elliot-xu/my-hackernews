import { AfterContentInit, Component, ContentChild, ContentChildren, Input, OnInit, QueryList } from '@angular/core';
import { debounce } from 'rxjs/operators';
import { NewsCommentWrapperComponent } from './news-comment-wrapper.component';
import { Comment } from '../comment';
import { timer } from 'rxjs';
import { HackerNewsService } from '../hacker-news.service';
import { NewsCommentNofity } from '../news-comment-notify.service';

@Component({
  selector: 'app-news-comment',
  templateUrl: './news-comment.component.html',
  styleUrls: ['./news-comment.component.css']
})
export class NewsCommentComponent implements OnInit, AfterContentInit {
  @Input() storyComment!: Comment;
  @ContentChild('commentKids') childContainer: NewsCommentWrapperComponent | undefined;

  public subAmount: number = 1;
  public hidden: boolean = false;
  public commentHidden: boolean = true;

  constructor(
    private hackerNews: HackerNewsService,
    private commentNotify: NewsCommentNofity
  ) { 
    this.commentNotify.missionAnnounced$.subscribe(
      _ => {
        this.onReply();
        this.ngAfterContentInit();
      }
    );
  }

  ngAfterContentInit(): void {
    if (this.childContainer) {
      this.childContainer.comments.changes
        .pipe(
          debounce(() => timer(300))
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
        if (c.childContainer && c.childContainer.storyIds) {
          this.subAmount += c.childContainer.storyIds.length;
        }
        c.childContainer?.comments.changes
          .pipe(
            debounce(() => timer(300))
          )
          .subscribe(_ => {
            this.childContainer?.comments.notifyOnChanges();
          });
        this.iterOverChildren(c.childContainer?.comments);
      }
    }
  }

  ngOnInit(): void {
  }

  onClickHide() {
    this.hidden = !this.hidden;
  }

  onReply(): void {
    this.commentHidden = !this.commentHidden;
  }

  onAddComment(commText: string): void {
    if (this.storyComment) {
      this.hackerNews.setItemById(this.storyComment.id, commText)
        .subscribe(x => {
          if (this.storyComment && this.storyComment.kids) {
            this.storyComment.kids = [x, ...this.storyComment.kids];
          } else if (this.storyComment) {
            this.storyComment.kids = [x];
          }
          
          this.commentNotify.announceMission();
        });
    }
  }
}
