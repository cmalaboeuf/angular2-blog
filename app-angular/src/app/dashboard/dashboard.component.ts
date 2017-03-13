import { Component, OnInit } from '@angular/core';
import {PostEditorComponent} from '../post-editor/post-editor.component';
import {ViewEncapsulation} from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
   encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  private authService : AuthService;
  constructor(_authService : AuthService) { 
    this.authService = _authService;
  }

  ngOnInit() {
  }

  logout(){
    this.authService.logout();
  }
}
