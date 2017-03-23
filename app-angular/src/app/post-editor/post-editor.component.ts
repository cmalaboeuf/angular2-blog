import { Component, OnInit, NgModule } from '@angular/core';
import {Post} from '../post/Model/Post';
import {PostService} from '../post/post.service';
import {ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.css'],
  providers: [PostService],
  encapsulation: ViewEncapsulation.None
})

export class PostEditorComponent implements OnInit {

  private newPost : Post = new Post();
  constructor(private postService: PostService) { }

  ngOnInit() {
  }

  saveNewPost(event){
    this.postService.add(this.newPost).subscribe(res => {
      return this.newPost;
    });;   
  }
}