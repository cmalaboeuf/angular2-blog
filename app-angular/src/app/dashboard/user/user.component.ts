import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';
import { User } from './Model/User';
import {FormGroup, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers : [UserService]
})

export class UserComponent implements OnInit {
  private id: string;
  private sub: any;

  passwordGroup : FormGroup;
  constructor(private route: ActivatedRoute,private userService :UserService, fb:FormBuilder) {
    this.passwordGroup = fb.group({
      'newPassword':"",
      "newPassword2" : ""
    })
  }
  private currentUser:User;

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.userService.getOne(this.id).subscribe(res=>{
        this.currentUser = res['data'] as User;
      });
    });
  }

  saveCurrentUser(){
    this.userService.update(this.currentUser).subscribe(res=>{return this.currentUser});
  }

  updatePassword(){
    if(this.passwordGroup.controls['newPassword'].value === this.passwordGroup.controls['newPassword2'].value){
      this.currentUser.password = this.passwordGroup.controls['newPassword2'].value;
      this.userService.update(this.currentUser).subscribe(res=>{return this.currentUser});
    }
    else{
      this.passwordGroup.disabled;
    }
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}