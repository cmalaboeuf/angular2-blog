import { Injectable, Inject } from '@angular/core';
import {BaseRequestOptions} from '@angular/http'
/**
 * Extending BaseRequestOptions to inject common headers to all requests.
 */
@Injectable() export
class CustomRequestOptions extends BaseRequestOptions {
    constructor() {
        super();
        //TODO Better than direct get token from localStorage
        this.headers.append('Authorization', 'JWT ' + window.localStorage.getItem('currentUser'));
    }
}