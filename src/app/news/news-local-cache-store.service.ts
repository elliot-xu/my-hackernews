import { Injectable } from '@angular/core';
import { News } from './news';
import { Comment } from './comment';

@Injectable({
    providedIn: 'root'
})
export class NewsLocalCacheStore {
    constructor() { }

    getItemById(id: number): News | Comment | null {
        const item = window.localStorage.getItem(id.toString());
        return item ? JSON.parse(item) : null;
    }

    setItemById(id: number, v: News | Comment): void {
        const v_stringify = JSON.stringify(v);
        window.localStorage.setItem(id.toString(), v_stringify);
    }
}