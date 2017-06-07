import { Injectable, Inject } from '@angular/core';
import { BaseRequestOptions, RequestOptionsArgs,Headers, RequestOptions } from '@angular/http'
/**
 * Extending BaseRequestOptions to inject common headers to all requests.
 */
@Injectable() export
  class CustomRequestOptions extends BaseRequestOptions {
  constructor() {
    super();
  }

  merge(options?: RequestOptionsArgs): RequestOptions {
    let header = new Headers();
    header.append('Authorization', 'JWT ' + window.localStorage.getItem('currentUser'));
    options.headers = header;
    var result = super.merge(options);
    result.merge = this.merge;
    return result;
  }
}