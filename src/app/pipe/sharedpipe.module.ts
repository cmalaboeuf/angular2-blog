import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';

import { MarkdownPipe }         from './markdown';

@NgModule({
  imports:      [ CommonModule ],
  declarations: [ MarkdownPipe],
  exports:      [ MarkdownPipe,
                  CommonModule, FormsModule ]
})
export class SharedPipeModule { }
