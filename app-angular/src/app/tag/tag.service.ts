import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Tag } from './Model/Tag';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TagService {
  constructor(private http: Http) {
    this.http = http;
  }
  private baseUrl = "/api/v1"
  getAll(): Observable<Tag> {
    return this.http.get(this.baseUrl + "/tags")
      .map(res => res.json());
  }

  public add(data) {
    return this.http.post(this.baseUrl + "/tags",data)
      .map(res => res.json());
  }

  // put(data) {
  //   return new Promise(resolve => {
  //     let index = tags.findIndex(todo => todo._id === data._id);
  //     tags[index].title = data.title;
  //     resolve(data);
  //   });
  // }

  // delete(id) {
  //   return new Promise(resolve => {
  //     let index = tags.findIndex(todo => todo._id === id);
  //     tags.splice(index, 1);
  //     resolve(true);
  //   });
  // }

  // deleteCompleted() {
  //   return new Promise(resolve => {
  //     resolve(tags);
  //   });
  // }
}