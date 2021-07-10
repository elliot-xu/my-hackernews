import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { News } from '../news';

@Component({
  selector: 'app-news-story',
  templateUrl: './news-story.component.html',
  styleUrls: ['./news-story.component.css']
})
export class NewsStoryComponent implements OnInit {
  @Input() story: News | undefined;

  constructor(
    private router: Router) {
  }

  ngOnInit(): void {
  }

  gotoDiscuss(id: number) {
    this.router.navigate([`/newsdiscuss/${id}`]);
  }
}
