import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { Post } from '../../blog/post/Model/Post';
import { PostService } from '../../services/post.service';
import { ViewEncapsulation } from '@angular/core';
import { TagService } from '../tag/tag.service';
import { UserService } from '../user/user.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {FormGroup, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.css'],
  providers: [PostService, TagService],
  encapsulation: ViewEncapsulation.Emulated,
  animations: [
    trigger('barState', [
      state('inactive', style({
        width: '0px',
        visibility: 'hidden'
      })),
      state('active', style({
        width: '300px',
        visibility: 'visible'
      })),
      transition('inactive => active', animate('200ms ease-in')),
      transition('active => inactive', animate('200ms ease-out')),
      transition('void => inactive', animate('200ms ease-out')),
      transition('void => active', animate('200ms ease-in'))
    ])
  ]
})

export class PostEditorComponent implements OnInit {

  private newPost: Post = new Post();
  private barState: String = 'inactive';
  public items: Array<string> = [];
  public value: any;
  private _disabledV = '0';
  private disabled = false;
  private postGroup: FormGroup;
  private sending = false;
  private error = false;

  constructor(private postService: PostService, private tagService: TagService, private userService: UserService, private fb:FormBuilder) {
     this.postGroup = fb.group({
      'url':'',
      'title': ''
    })
   }

  ngOnInit() {
    this.tagService.getAll().subscribe(res => {
      return this.items = res['data'].map((item: any) => {
        return { id: item._id, text: item.name };
      });
    });
    this.postGroup.controls['url'].valueChanges.subscribe((
      url=>{
        this.postGroup.controls['url'].setValue(url.replace(/\s+/g, '-').toLowerCase(),{emitEvent: false});
        this.newPost.url = url;
      })
    );

    this.postGroup.controls['title'].valueChanges.subscribe((
      title => {
        this.newPost.url = this.newPost.url || '';
        let copyTitle = title.slice(0, -1);
        if(copyTitle.replace(/\s+/g, '-').toLowerCase() === this.newPost.url){
          this.postGroup.controls['url'].setValue(title.replace(/\s+/g, '-').toLowerCase());
        }
        this.newPost.title = title;
      })
    );
  }

  saveNewPost(event) {
    this.error = false;
    this.sending = true;

    this.newPost.author = new Array(this.userService.me['data']._id);
    this.postService.add(this.newPost).subscribe(res => {
      this.sending = false;
      this.error = false;
      return this.newPost;
    }, err => {
      this.sending = false;
      this.error = true;
    });
  }

  toggleStateBar(event) {
    if (this.barState === 'inactive') {
      this.barState = 'active';
    } else {
      this.barState = 'inactive';
    }
  }

  closeBar(event) {
    this.barState = 'inactive';
  }

  private get disabledV(): string {
    return this._disabledV;
  }

  private set disabledV(value: string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

  public selected(value: any): void {
    console.log('Selected value is: ', value);
  }

  public removed(value: any): void {
    console.log('Removed value is: ', value);
  }

  public refreshValue(value: any): void {
    this.newPost.tags = value.map((item: any) => {
      return item.id;
    });
  }

  public itemsToString(value: Array<any> = []): string {
    return value
      .map((item: any) => {
        return item.text;
      }).join(',');
  }
}