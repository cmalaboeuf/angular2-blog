import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent implements OnInit {
  public service :AuthService;

  constructor(authservice:AuthService) {
    this.service = authservice;
  }

  logout() {
    this.service.logout();
  }

  getinfo() {
    // this.service.getinfo().then(data => {
    //   if (data.success) {
    //     // var alert = Alert.create({
    //     //   title: data.success,
    //     //   subTitle: data.msg,
    //     //   buttons: ['ok']
    //     // });
    //     //this.nav.present(alert);
    //   }

    // })
  }
  ngOnInit() {
  }
}
