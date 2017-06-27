import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';
import { User } from './Model/User';
import {FormGroup, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers : [UserService]
})

export class UserComponent implements OnInit {
  private id: string;
  private sub: any;


  private sending:boolean =false;
  private error:boolean = false;

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
    this.error = false;
    this.sending = true;
    this.userService
      .update(this.currentUser)
      .subscribe(
        res=>{
          setTimeout(()=>{this.sending = false},200);
          return this.currentUser
        },
        err=>{
          this.sending= false;
          this.error= true;
        }
      );
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