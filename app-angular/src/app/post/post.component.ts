import { Component, OnInit } from '@angular/core';
import { PostService } from './post.service';
import {Post} from './Model/Post';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  providers: [PostService],
  encapsulation: ViewEncapsulation.None
})
export class PostComponent implements OnInit {
  private posts;  
  private newPost;

  constructor(private postService: PostService) { }
  getPosts(){
    return this.postService.getAll().subscribe(res => {
      return this.posts = res["posts"];
    });
  }

  ngOnInit() {
    this.getPosts();
  }

  // addPost(){
  //   this.postService.add({ title: this.newPost, isDone: false }).then(() => {
  //     return this.getPosts();
  //   }).then(() => {
  //     this.newPost = ''; // clear input form value
  //   });
  // }

  // updatePost(post, newValue) {
  //   post.title = newValue;
  //   return this.postService.put(post).then(() => {
  //     post.editing = false;
  //     return this.getPosts();
  //   });
  // }

  // destroyPost(post){
  //   this.postService.delete(post._id).then(() => {
  //     return this.getPosts();
  //   });
  // }

  // clearCompleted() {
  //   this.postService.deleteCompleted().then(() => {
  //     return this.getPosts();
  //   });
  // }
}

