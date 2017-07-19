import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Post } from 'app/blog/post/Model/Post';
import { Observable } from 'rxjs/Observable';

let posts = [];
@Injectable()
export class PostService {
  private baseUrlAuth = '/api/v1';
  private baseUrl = '/api';

  constructor(private http: Http) {
    this.http = http;
  }

  getAll(): Observable<any> {
    return this.http.get(this.baseUrlAuth + '/posts')
      .map(res => res.json());
  }

  getByUrl(url): Observable<Post> {
    return this.http.get(this.baseUrlAuth + '/posts/' + url)
      .map(res => res.json());
  }

  getAllUnauthenticated(): Observable<Post> {
    return this.http.get(this.baseUrl + '/posts')
      .map(res => res.json());
  }

  getByIdUnauthenticated(id): Observable<Post> {
    return this.http.get(this.baseUrl + '/posts/' + id)
      .map(res => res.json());
  }

  public add(data) {
    return this.http.post(this.baseUrlAuth + '/posts', data)
      .map(res => res.json());
  }

  put(data) {
    return new Promise(resolve => {
      let index = posts.findIndex(todo => todo._id === data._id);
      posts[index].title = data.title;
      resolve(data);
    });
  }

  delete(id) {
    return new Promise(resolve => {
      let index = posts.findIndex(todo => todo._id === id);
      posts.splice(index, 1);
      resolve(true);
    });
  }

  deleteCompleted() {
    return new Promise(resolve => {
      resolve(posts);
    });
  }
}