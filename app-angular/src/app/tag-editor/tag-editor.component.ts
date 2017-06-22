import { Component, OnInit,Input} from '@angular/core';
import {NgbRadioGroup} from '@ng-bootstrap/ng-bootstrap'
import {TagService} from '../tag/tag.service';
import {Tag} from '../tag/Model/Tag';
import {TagComponent} from '../tag/tag.component';

@Component({
  selector: 'app-tag-editor',
  templateUrl: './tag-editor.component.html',
  styleUrls: ['./tag-editor.component.css'],
  providers: [TagService]

})
export class TagEditorComponent implements OnInit {

  public tags: Array<Tag>;

  public currentTag:Tag;

  public isUpdate:Boolean;

  constructor(private tagService: TagService) {
    this.currentTag = new Tag();
    this.isUpdate = false;

   }
  getTags(){
    return this.tagService.getAll().subscribe(res => {
      return this.tags = res["data"];
    });
  }

  ngOnInit() {
    this.getTags()
  }

  newTag(event){
    this.isUpdate = false;
    this.currentTag = new Tag();
  }

  saveCurrentTag(event){
    if(this.isUpdate === false){
      this.tagService.add(this.currentTag).subscribe(res => {
        return this.tags.push(this.currentTag);
      });
    }
    else{
      this.isUpdate = false;
      console.log (this.isUpdate)
      this.tagService.update(this.currentTag)
        .subscribe(res=>{return this.tags});
    }
  }

   onNotify(tag:Tag):void {
    this.isUpdate = true;
    this.currentTag = tag;
  }
}
