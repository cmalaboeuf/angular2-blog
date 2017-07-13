/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PostService } from './post.service';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Post } from '../blog/post/Model/Post';


describe('PostService', () => {
  const API_URL: String = 'http://example.com';
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        PostService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  it('should return an Observable<Array<Post>>', inject([PostService, XHRBackend], (postService: PostService, mockBackend: MockBackend) => {
    const mockResponse = {
      data: [
        { title: 'Post 1', url: 'posts-1', content: 'This is a content', date: Date.now()},
        { title: 'Post 2', url: 'posts-2', content: 'This is a content', date: Date.now() },
      ]
    };
    mockBackend.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: mockResponse
      })));
    });
    postService.getAll().subscribe((posts: any) => {
      expect(posts.data.length).toBe(2);
      expect(posts.data[0].title).toEqual('Post 1');
      expect(posts.data[1].title).toEqual('Post 2');
    });
  }));
});
