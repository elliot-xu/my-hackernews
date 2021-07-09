import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { News } from './news';
import { Comment } from './comment';

@Injectable({
    providedIn: 'root'
})
export class HackerNewsService {
    constructor(public http: HttpClient) { }

    getNewStories(): Observable<number[]> {
        return this.http.get<number[]>('https://hacker-news.firebaseio.com/v0/newstories.json');
    }

    getTopStories(): Observable<number[]> {
        return this.http.get<number[]>('https://hacker-news.firebaseio.com/v0/topstories.json');
    }

    getBestStories(): Observable<number[]> {
        return this.http.get<number[]>('https://hacker-news.firebaseio.com/v0/beststories.json');
    }

    getAskStories(): Observable<number[]> {
        return this.http.get<number[]>('https://hacker-news.firebaseio.com/v0/askstories.json');
    }

    getShowStories(): Observable<number[]> {
        return this.http.get<number[]>('https://hacker-news.firebaseio.com/v0/showstories.json');
    }

    getJobStories(): Observable<number[]> {
        return this.http.get<number[]>('https://hacker-news.firebaseio.com/v0/jobstories.json');
    }

    getNewsById(id: number): Observable<News> {
        return this.http.get<News>(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
    }

    getCommentById(id: number): Observable<Comment> {
        return this.http.get<Comment>(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
    }
}