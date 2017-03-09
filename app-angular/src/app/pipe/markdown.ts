import { Pipe, PipeTransform } from '@angular/core';

import * as Marked from 'marked';

@Pipe({
  name: 'markdown'
})
export class MarkdownPipe implements PipeTransform {
    public marked : Marked;
    contructor(marked:Marked){
        marked.setOptions({
        renderer: new Marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: false
        });
    }
  transform(value: any): string {
   return this.marked(value);
  }
}