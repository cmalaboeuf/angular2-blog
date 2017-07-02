import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-page-not-found',
  template: `<h1>404 Page not found</h1>`,
  providers: [],
  encapsulation: ViewEncapsulation.None
})
export class PageNotFoundComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    
  }

  ngOnDestroy(){
   
  }
}

