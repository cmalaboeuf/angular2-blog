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
      name: '',
      password: ''
    }
    this.router = router;
  }

  login(usercreds) {
    console.log("plop");
    this.myservice.login(usercreds).then(data => {
      if (data){
        this.router.navigate(["dashboard/home"]);
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
