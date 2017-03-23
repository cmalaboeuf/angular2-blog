import { Component, OnInit, Input } from '@angular/core';
import {Tag} from './Model/Tag';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

  @Input() sample :Tag;
  constructor() { }

  ngOnInit() {
  }
}