import { Component, OnInit } from '@angular/core';
import {PostEditorComponent} from '../post-editor/post-editor.component';
import {ViewEncapsulation} from '@angular/core';
import { AuthService } from '../auth.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
   encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  private authService : AuthService;
  private router : Router;
  constructor(_authService : AuthService, _router:Router) {
    this.authService = _authService;
    this.router = _router;
  }

  ngOnInit() {
  }

  logout(){
    this.router.navigate(['/blog']);
    this.authService.logout();
  }
}
