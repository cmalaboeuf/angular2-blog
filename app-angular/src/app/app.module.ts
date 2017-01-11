import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import { LoginComponent } from './login/login.component';
import { UserpageComponent } from './userpage/userpage.component';
import {AuthService} from './auth.service';

const routes: Routes = [
  { path: 'userpage', component : UserpageComponent},
  { path: 'post',component: PostComponent },
  { path: '**',component:LoginComponent}

];
@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    LoginComponent,
    UserpageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }