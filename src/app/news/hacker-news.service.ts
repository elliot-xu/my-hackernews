import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, scheduled, asapScheduler } from 'rxjs';
import { News } from './news';
import { Comment } from './comment';
import { NewsLocalCacheStore } from './news-local-cache-store.service';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class HackerNewsService {
    constructor(
        public http: HttpClient,
        private cacheStore: NewsLocalCacheStore) { }

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
        const item = this.cacheStore.getItemById(id) as News;
        if(item) {
            return scheduled([item], asapScheduler);
        } else {
            return this.http.get<News>(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
            .pipe(
                tap(x => this.cacheStore.setItemByid(id, x))
            );
        }
    }

    getCommentById(id: number): Observable<Comment> {
        const item = this.cacheStore.getItemById(id) as Comment;
        if(item) {
            return scheduled([item], asapScheduler);
        } else {
            return this.http.get<Comment>(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
            .pipe(
                tap(x => this.cacheStore.setItemByid(id, x))
            );
        }
    }
}