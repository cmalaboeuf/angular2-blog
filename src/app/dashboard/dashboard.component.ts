import { Component, OnInit } from '@angular/core';
import { PostEditorComponent} from './post-editor/post-editor.component';
import { ViewEncapsulation} from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { AuthService } from '../services/auth.service';
import { Router} from '@angular/router';
import { UserService} from './user/user.service';
import { User} from './user/Model/User';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers : [UserService],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('dropdownState', [
      state('inactive', style({
        visibility: 'hidden',
        overflow : 'hidden',
        height : '0px'
      })),
      state('active', style({
        visibility: 'visible'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out')),
      transition('void => inactive', animate('100ms ease-out')),
      transition('void => active', animate('100ms ease-in'))
    ])
  ]
})
export class DashboardComponent implements OnInit {

  public user: User;
  private dropdownState: String = 'inactive';
  constructor(private authService: AuthService, private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.userService.getMe().subscribe(res => {
      this.user = res['data'] as User;
    });
  }
  toggleDropdown(event) {
    if (this.dropdownState === 'inactive') {
      this.dropdownState = 'active';
    } else {
      this.dropdownState = 'inactive';
    }
  }
  closeDropdown(event) {
    this.dropdownState = 'inactive';
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