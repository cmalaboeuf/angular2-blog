import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post} from './Model/Post';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscription} from 'rxjs/Subscription';
import { ViewEncapsulation} from '@angular/core';
import { Router} from '@angular/router';

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

  constructor(private postService: PostService,private router:Router) { }
  getPosts(){
    return this.postService.getAllUnauthenticated().subscribe(res => {
      return this.posts = res['data'] || [];
    });
  }

  ngOnInit() {
    this.getPosts();
  }

  goToPostDetail(id){
    this.router.navigate(['', id]);
  }
}

