import { Component, OnInit } from '@angular/core';
import {NgbRadioGroup} from '@ng-bootstrap/ng-bootstrap'
import {TagService} from '../tag/tag.service';

@Component({
  selector: 'app-tag-editor',
  templateUrl: './tag-editor.component.html',
  styleUrls: ['./tag-editor.component.css'],
  providers: [TagService],
})
export class TagEditorComponent implements OnInit {

  public tags;

  constructor(private tagService: TagService) { }
  getTags(){
    return this.tagService.getAll().subscribe(res => {
      return this.tags = res["tags"];
    });
  }

  ngOnInit() {
    this.getTags()
  }

}
