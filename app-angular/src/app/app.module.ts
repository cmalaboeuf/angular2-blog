import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import { LoginComponent } from './login/login.component';
import { UserpageComponent } from './userpage/userpage.component';
import { AuthService} from './auth.service';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BlogComponent } from './blog/blog.component';
import { RequestOptions } from '@angular/http';
import { CustomRequestOptions } from './my-header';
import { PostEditorComponent } from './post-editor/post-editor.component';
import { MarkdownPipe } from './pipe/markdown';
import { TagEditorComponent } from './tag-editor/tag-editor.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TagComponent } from './tag/tag.component';
import { ContentComponent } from './content/content.component';
import { SelectModule } from 'ng2-select-compat';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: 'blog', component : BlogComponent},
  { path: 'userpage', component : UserpageComponent},// must be a child of dashboard
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
    children: [
      {path : 'home', component : DashboardComponent, canActivateChild: [AuthGuard]},
      {path : 'user', component : UserComponent, canActivateChild: [AuthGuard]},
      {path : 'newpost', component : PostEditorComponent, canActivateChild: [AuthGuard]},
      {path : 'tageditor', component : TagEditorComponent, canActivateChild: [AuthGuard]},
      {path : 'content',component: ContentComponent,canActivateChild: [AuthGuard]}
    ] },//find a way to unified dashboard && admin && ..
  { path: 'admin', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'post',component: PostComponent },//must be a child of blog
  { path: 'login',component: LoginComponent },//must be a child of blog
  { path: '**',component:LoginComponent}

];
@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    LoginComponent,
    UserpageComponent,
    DashboardComponent,
    BlogComponent,
    PostEditorComponent,
    MarkdownPipe,
    TagEditorComponent,
    TagComponent,
    ContentComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    NgbModule.forRoot(),
    SelectModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    {provide: RequestOptions, useClass: CustomRequestOptions}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }