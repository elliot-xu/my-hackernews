import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { News } from '../news';

@Directive({
  selector: '[appNewsTitle]'
})
export class NewsTitleDirective {
  constructor(private el: ElementRef) {
  }

  @Input()
  public set news(v: News) {
    let gotoDiscuss = `/newsdiscuss/${v.id}`;
    this.el.nativeElement.setAttribute('href', v.url ? v.url : gotoDiscuss);
  }
}