import { Component, OnInit, NgModule } from '@angular/core';
import {Post} from '../../blog/post/Model/Post';
import {PostService} from '../../services/post.service';
import {ViewEncapsulation} from '@angular/core';
import { TagService } from '../tag/tag.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.css'],
  providers: [PostService,TagService],
  encapsulation:ViewEncapsulation.Emulated

})

export class PostEditorComponent implements OnInit {

  private newPost : Post = new Post();
  constructor(private postService: PostService, private tagService : TagService,private userService:UserService) {/**/}

  ngOnInit() {
   this.tagService.getAll().subscribe(res=>{
     return this.items = res["data"].map((item:any)=> {
       return {id : item._id,text: item.name};
     });
    })
  }

  saveNewPost(event){
    this.newPost.author = new Array(this.userService.me['data']._id);
    this.postService.add(this.newPost).subscribe(res => {
      return this.newPost;
    });
  }

 public items:Array<string> = [];

  public value:any;
  private _disabledV:string = '0';
  private disabled:boolean = false;

  private get disabledV():string {
    return this._disabledV;
  }

  private set disabledV(value:string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

  public selected(value:any):void {
    console.log('Selected value is: ', value);
  }

  public removed(value:any):void {
    console.log('Removed value is: ', value);
  }

  public refreshValue(value:any):void {
    this.newPost.tags = value.map((item:any) => {
        return item.id;
      });
  }

  public itemsToString(value:Array<any> = []):string {
    return value
      .map((item:any) => {
        return item.text;
      }).join(',');
  }
}