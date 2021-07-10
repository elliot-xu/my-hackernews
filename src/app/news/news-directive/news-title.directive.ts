import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { News } from '../news';

@Directive({
  selector: '[appNewsTitle]'
})
export class NewsTitleDirective {
  constructor(private el: ElementRef) {
    this.el.nativeElement.style.textDecoration = 'none';
    this.el.nativeElement.style.color = '#000000';
  }

  @Input()
  public set news(v: News) {
    let gotoDiscuss = `/newsdiscuss/${v.id}`;
    this.el.nativeElement.setAttribute('href', v.url ? v.url : gotoDiscuss);
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.cursor = 'pointer';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.cursor = '';
  }
}