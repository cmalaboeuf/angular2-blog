import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import {Tag} from './Model/Tag';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {
  @Output() notify: EventEmitter<Tag> = new EventEmitter<Tag>();
  @Input() tag :Tag;
  constructor() { }

  ngOnInit() {
  }
  
  onClick(tag:Tag) {    
    this.notify.emit(tag);
  }
}