import { Component, OnInit } from '@angular/core';
import {NgbRadioGroup} from '@ng-bootstrap/ng-bootstrap'
import {TagService} from '../tag/tag.service';
import {Tag} from '../tag/Model/Tag';

@Component({
  selector: 'app-tag-editor',
  templateUrl: './tag-editor.component.html',
  styleUrls: ['./tag-editor.component.css'],
  providers: [TagService],
})
export class TagEditorComponent implements OnInit {

  public tags: Array<Tag>;

  public newTag:Tag

  constructor(private tagService: TagService) {
    this.newTag = new Tag();
   }
  getTags(){
    return this.tagService.getAll().subscribe(res => {
      return this.tags = res["tags"];
    });
  }

  ngOnInit() {
    this.getTags()
  }

  saveNewTag(event){
    this.tagService.add(this.newTag).subscribe(res => {
      return this.newTag;
       
    });
    this.getTags();
  }
}
