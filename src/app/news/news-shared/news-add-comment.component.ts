import { Component, OnInit, EventEmitter, 
  ViewChild, ElementRef, AfterViewInit, Output } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-news-add-comment',
  templateUrl: './news-add-comment.component.html',
  styleUrls: ['./news-add-comment.component.css']
})
export class NewsAddCommentComponent implements OnInit, AfterViewInit {
  public commText: string = '';
  
  @Output()
  public onCommentTextChanged = new EventEmitter<string>();

  @ViewChild('btnClick') btnClick!: ElementRef; 

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    fromEvent(this.btnClick.nativeElement, 'click')
      .pipe(
        debounceTime(300)
      ).subscribe(
        _ => {
          if(this.commText) {
            this.onCommentTextChanged.emit(this.commText);
            this.commText = '';
          }
        }
      );
  }
}
