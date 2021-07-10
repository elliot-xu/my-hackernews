import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'extractDomain' })
export class ExtractDomainPipe implements PipeTransform {
  transform(value: string): string {
    let r = ('' + value).match(/(?<=\/\/)(www.)?([^/]+)/i);
    return r && r.length > 2 ? r[2] : '';
  }
}