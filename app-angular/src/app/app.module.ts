import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { RequestOptions } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import { LoginComponent } from './login/login.component';
import { AuthService} from './auth.service';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BlogComponent } from './blog/blog.component';
import { CustomRequestOptions } from './my-header';
import { SelectModule } from 'ng2-select-compat';

// import { PostEditorComponent } from './post-editor/post-editor.component';
// import { MarkdownPipe } from './pipe/markdown';
// import { TagEditorComponent } from './tag-editor/tag-editor.component';
// import { TagComponent } from './tag/tag.component';
// import { ContentComponent } from './content/content.component';

// import { UserComponent } from './user/user.component';

const routes: Routes = [
   { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path : 'dashboard',loadChildren:'app/dashboard/dashboard.module#DashboardModule'}
  // { path: 'blog', component : BlogComponent},
  // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
  //   children: [
  //     {path : 'user/:id', component : UserComponent, canActivateChild: [AuthGuard]},
  //     {path : 'newpost', component : PostEditorComponent, canActivateChild: [AuthGuard]},
  //     {path : 'tageditor', component : TagEditorComponent, canActivateChild: [AuthGuard]},
  //     {path : 'content',component: ContentComponent,canActivateChild: [AuthGuard]}
  //   ] },//find a way to unified dashboard && admin && ..
  // { path: 'admin', component: DashboardComponent, canActivate: [AuthGuard]},
  // { path: 'post',component: PostComponent },//must be a child of blog
  // { path: 'login',component: LoginComponent },//must be a child of blog
  // { path: '**',component:LoginComponent}

];
@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    LoginComponent,
    BlogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
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