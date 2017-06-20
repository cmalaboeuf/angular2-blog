import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';
import { User } from './Model/User';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers : [UserService]
})

export class UserComponent implements OnInit {
  private id: string;
  private sub: any;
  constructor(private route: ActivatedRoute,private userService :UserService) { }
  private currentUser:User;
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      console.log(params);
      this.id = params['id'] + ""; // (+) converts string 'id' to a number
       // In a real app: dispatch action to load the details here.
      this.userService.getOne(this.id).subscribe(res=>{
        this.currentUser = res['data'] as User;
      });
    });
  }

  saveCurrentUser(){
    // console.log(this.currentUser);
    this.userService.update(this.currentUser).subscribe(res=>{return this.currentUser});
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }


}