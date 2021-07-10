import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'hideComment' })
export class HideCommentPipe implements PipeTransform {
  transform(value: number, hidden: boolean): string {
    let hideText = `[${value} more]`;
    return hidden ? hideText : '[-]';
  }
}