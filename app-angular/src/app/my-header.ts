import { Injectable, Inject } from '@angular/core';
import {BaseRequestOptions} from '@angular/http'
/**
 * Extending BaseRequestOptions to inject common headers to all requests.
 */
@Injectable() export
class CustomRequestOptions extends BaseRequestOptions {
    constructor() {
        super();
        this.headers.append('Authorization', 'my-token');
        this.headers.append('foo', 'bar');
    }
}