import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
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
  public animShake:boolean = false;

  constructor(authservice:AuthService,private router:Router,fb:FormBuilder) {
    this.myservice = authservice;
    this.usercreds = fb.group({
      "email": [null, Validators.required],
      "password": [null, Validators.required]
    });
  }

  clickLogin() {
    this.animShake = false;
    let user:Object = {
      email:this.usercreds.controls.email.value,
      password:this.usercreds.controls.password.value,
    }
    this.myservice.login(user).then(data => {
      console.log(data);
      if (data){
        this.router.navigate(["dashboard/newpost"]);
        return;
      }
    },err=>{
      this.animShake= true;
      setTimeout(()=>{
        this.animShake = false;
      },820);
    });
  }
  register() {
    //this.nav.push(SignupPage);
  }

  ngOnInit() {
  }

}
