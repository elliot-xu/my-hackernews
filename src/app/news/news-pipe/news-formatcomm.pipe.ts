import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatComment' })
export class FormatCommentPipe implements PipeTransform {
    transform(value: number|undefined): string {
        let comment = `${value} comment`;
        let commentPlural = `${value} comments`;

        return value ? value > 1 ? commentPlural : comment : 'discuss'; 
    }
}