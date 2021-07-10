import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'timeAge' })
export class TimeAgePipe implements PipeTransform {
    transform(value: number): string {
        let now = new Date().getTime() / 1000;

        let mins = Math.floor((now - value) / 60);
        let hrs = Math.floor(mins / 60);
        let days = Math.floor(hrs / 24);

        return days > 0 ? `${days} days ago` : 
            hrs > 0 ? `${hrs} hours ago` : `${mins} minutes ago`;
    }
}