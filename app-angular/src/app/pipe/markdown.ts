import { Pipe, PipeTransform } from '@angular/core';
import * as showdown from 'showdown';

@Pipe({
  name: 'markdown'
})
export class MarkdownPipe implements PipeTransform {    
  transform(value: any): string {    
    var converter =  new showdown.Converter();
    return converter.makeHtml(value);
  }
}