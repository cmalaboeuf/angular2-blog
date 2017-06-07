import { Component, OnInit } from '@angular/core';
import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class AuthService {
  public http: Http;
  public isLoggedin:boolean;

  constructor(http:Http) {
    this.http = http;
    this.isLoggedin = false;
  }

  login(user):any {
    var headers = new Headers();
    var creds = {
      name : user.name,
      password: user.password
    };
    headers.append('Content-Type', 'application/json');
    return new Promise(resolve => {
      this.http.post('http://localhost/api/authenticate', creds, { headers }).subscribe(data => {
        if (data.json().success) {
          window.localStorage.setItem('currentUser', data.json().token);
          this.isLoggedin = true;
        }
        resolve(this.isLoggedin);
      });
    });
  }

  // getinfo() {
  //   var headers = new Headers();
  //   var creds = "name=" + user.name + "&password=" + user.password;
  //   headers.append('Content-Type', 'application/x-www-form-urlencoded');
  //   return new Promise(resolve => {
  //     this.http.post('http://192.168.99.100/api/getinfo', creds, { headers: headers }).subscribe(data => {
  //       resolve(data);
  //     });
  //   });
  // }

  register(user):any {
    return new Promise(resolve => {
      var creds = "name=" + user.name + "&password=" + user.password;
      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      this.http.post('http://localhost/api/adduser', creds, { headers: headers }).subscribe(data => {
        if (data.json().success)
          resolve(true);
        else
          resolve(false);
      });
    });
  }

  logout():void {
    this.isLoggedin = false;
    window.localStorage.clear();
  }
}