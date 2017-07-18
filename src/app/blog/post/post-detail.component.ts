import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PostService } from '../../services/post.service';
import { Post } from './Model/Post';

@Component({
  selector: 'app-post-detail',
  template: `
  <article class="offset-lg-2 col-lg-8">
    <header>
      <h3>{{post?.title}}</h3>
    </header>
    <section>
    <div [innerHtml]="post.content | markdown">
    </div>
    </section>
    <section>
      <a *ngFor="let author of post?.author" href="#">{{author?.firstname }} {{author?.name}}</a>
      <a *ngFor="let tag of post?.tags" href="#">{{tag.name}}</a>&nbsp;|&nbsp;
      <time class="post-date date">{{post?.createdAt | date:'medium'}}</time>
    </section>
  </article>
`,
  styles: [
  `app-post-detail {
    width:100%;
    margin:15px 0px;
  }`],
  providers: [PostService],
  encapsulation: ViewEncapsulation.None
})
export class PostDetailComponent implements OnInit {
  private post;
  private sub: any;
  private url: string;

  constructor(private postService: PostService,private route : ActivatedRoute) { }

  ngOnInit() {
     this.sub = this.route.params.subscribe(params => {
      this.url = params['slug'];
      this.postService.getByIdUnauthenticated(this.url).subscribe(res=>{
        this.post = res['data'] as Post;
        console.log(this.post);
      });
    });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}

