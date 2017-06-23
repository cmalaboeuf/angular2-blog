import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { RequestOptions } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SelectModule } from 'ng2-select-compat';

/**/
import { CustomRequestOptions } from '../my-header';
import { AuthGuard } from '../auth.guard';
import { MarkdownPipe } from '../pipe/markdown';
import { AuthService } from '../services/auth.service';

import { BlogRoutingModule } from './blog-routing.module';
import { PostComponent } from './post/post.component';
import { BlogComponent } from './blog.component';

@NgModule({
  imports: [
    CommonModule,
    BlogRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    SelectModule],
  exports: [
    PostComponent
  ],
   schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    MarkdownPipe,
    PostComponent,
    BlogComponent
    ],
  providers: [
    AuthGuard,
    AuthService,
    { provide: RequestOptions, useClass: CustomRequestOptions }]

})
export class BlogModule { }