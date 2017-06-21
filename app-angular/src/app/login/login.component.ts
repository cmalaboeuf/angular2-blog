import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {Router} from '@angular/router';
import {FormGroup, FormBuilder,Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public myservice:AuthService;
  public usercreds: FormGroup;
  constructor(authservice:AuthService,private router:Router,fb:FormBuilder) {
    this.myservice = authservice;
    this.usercreds = fb.group({
      "email": [null, Validators.required],
      "password": [null, Validators.required]
    });
  }

  clickLogin() {
    let user:Object = {
      email:this.usercreds.controls.email.value,
      password:this.usercreds.controls.password.value,
    }
    this.myservice.login(user).then(data => {
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
