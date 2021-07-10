import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatPoint' })
export class FormatPointPipe implements PipeTransform {
    transform(value: number): string {
        let point = `${value} point`;
        let pointPlural = `${value} points`;

        return value > 1 ? pointPlural : point; 
    }
}