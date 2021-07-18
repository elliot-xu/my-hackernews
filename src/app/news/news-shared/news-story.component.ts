import { Component, Input, OnInit } from '@angular/core';
import { News } from '../news';

@Component({
  selector: 'app-news-story',
  templateUrl: './news-story.component.html',
  styleUrls: ['./news-story.component.css']
})
export class NewsStoryComponent implements OnInit {
  @Input() story: News | null = null;

  constructor() {
  }

  ngOnInit(): void {
  }
}
