import { Component, OnInit } from '@angular/core';
import { PostService } from '../post/post.service';
import { Post} from '../post/Model/Post';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  providers : [PostService]
})
export class ContentComponent implements OnInit {
  private postService : PostService;
  private currentPost:Post;

  public posts:Array<Post>;
  constructor(_postService :PostService) {
    this.postService = _postService;
    this.posts = new Array();
    this.currentPost = new Post();
  }

  getPosts(){
    return this.postService.getAll().subscribe(res => {
      return this.posts = res["posts"];
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
