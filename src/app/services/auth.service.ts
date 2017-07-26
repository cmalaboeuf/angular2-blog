import { Component, OnInit } from '@angular/core';
import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  public http: Http;
  public isLoggedin: boolean;

  constructor(http: Http, private router: Router) {
    this.http = http;
    this.isLoggedin = false;
  }

  login(user): any {
    let headers = new Headers();
    let creds = {
      email: user.email,
      password: user.password
    };
    headers.append('Content-Type', 'application/json');
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost/api/authenticate', creds, { headers }).subscribe(data => {
        if (data.json().success) {
          window.localStorage.setItem('currentUser', data.json().token);
          this.isLoggedin = true;
          resolve(this.isLoggedin);
        }
      }, err => {
        reject(err);
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

  register(user): any {
    return new Promise(resolve => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post('http://localhost/api/adduser', user, { headers }).subscribe(data => {
        if (data.json().success) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  logout(): void {
    this.isLoggedin = false;
    window.localStorage.clear();
    this.router.navigate(['/login']);
  }
}