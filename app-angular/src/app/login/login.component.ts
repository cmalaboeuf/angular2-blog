import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public myservice:AuthService;
  public usercreds: any;
  public router : Router;
  constructor(authservice:AuthService,router:Router) {
    this.myservice = authservice;
    this.usercreds = {
      email: '',
      password: ''
    }
    this.router = router;
  }

  clickLogin(usercreds) {
    this.myservice.login(usercreds).then(data => {
      if (data){
        this.router.navigate(["dashboard/newpost"]);
        return;
      }
    });
  }
  register() {
    //this.nav.push(SignupPage);
  }

  ngOnInit() {
  }

}
