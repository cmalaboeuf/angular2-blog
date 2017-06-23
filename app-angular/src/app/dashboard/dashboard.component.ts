import { Component, OnInit } from '@angular/core';
import {PostEditorComponent} from './post-editor/post-editor.component';
import {ViewEncapsulation} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router} from '@angular/router';
import { UserService} from './user/user.service';
import { User} from './user/Model/User';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers : [UserService],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  public user:User;
  constructor(private authService : AuthService, private router:Router,private userService :UserService) {}

  ngOnInit() {
    this.userService.getMe().subscribe(res=>{
      this.user = res['data'] as User;
    });
  }

  goToUser(id){
    if(this.user !== null){
       this.router.navigate(['/dashboard/user', id]);
    }
  }

  logout(){
    this.router.navigate(['/blog']);
    this.authService.logout();
  }
}