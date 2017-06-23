import { Component, OnInit } from '@angular/core';
import { PostService } from 'app/services/post.service';
import { Post} from 'app/blog/post/Model/Post';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  providers : [PostService]
})
export class ContentComponent implements OnInit {
  private postService : PostService;
  private currentPost:Post;

  public posts:Array<Post> = new Array();
  constructor(_postService :PostService) {
    this.postService = _postService;
    this.posts = new Array();
    this.currentPost = new Post();
  }

  getPosts(){
    return this.postService.getAll().subscribe(res => {
      return this.posts = res["data"] || [];
    });
  }
  onClick(post:Post){
    this.currentPost = post;
  }

  ngOnInit() {
    this.getPosts();
    if(this.posts.length>0){
      this.currentPost = this.posts.shift();
    }
  }



}
