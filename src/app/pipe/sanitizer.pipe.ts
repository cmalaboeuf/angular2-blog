import { DomSanitizer, SafeResourceUrl, SafeUrl,SafeHtml} from '@angular/platform-browser';

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sanitizer'
})
export class SanitizerPipe implements PipeTransform {
  constructor (private _sanitizer: DomSanitizer) { }

  transform(value: string): SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml(value || '');
  }
}