import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public myservice: AuthService;
  public usercreds: FormGroup;
  public animShake = false;

  constructor(authservice: AuthService, private router: Router, fb: FormBuilder) {
    this.myservice = authservice;
    this.usercreds = fb.group({
      'firstname': [null, Validators.required],
      'name': [null, Validators.required],
      'email': [null, Validators.required],
      'password': [null, Validators.required]
    });
  }

  clickRegister() {
    this.animShake = false;
    let user: Object = {
      firstname: this.usercreds.controls.firstname.value,
      name: this.usercreds.controls.name.value,
      email: this.usercreds.controls.email.value,
      password: this.usercreds.controls.password.value,
    }
    this.myservice.register(user).then(data => {
      if (data) {
        this.router.navigate(['login']);
        return;
      }
    }, err => {
      this.animShake = true;
      setTimeout(() => {
        this.animShake = false;
      }, 820);
    });
  }

  ngOnInit() {
  }

}
