import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostEditorComponent } from './post-editor/post-editor.component';
import { DashboardComponent } from './dashboard.component';
import { TagEditorComponent } from './tag-editor/tag-editor.component';
import { TagComponent } from './tag/tag.component';
import { ContentComponent } from './content/content.component';
import { AuthGuard } from '../auth.guard';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', redirectTo: 'editor', pathMatch: 'full'},
  { path: '', component: DashboardComponent, children: [
      { path: 'user/:id', component: UserComponent, canActivateChild: [AuthGuard] },
      { path: 'editor/:url', component: PostEditorComponent, canActivateChild: [AuthGuard] },
      { path: 'editor', component: PostEditorComponent, canActivateChild: [AuthGuard] },
      { path: 'tageditor', component: TagEditorComponent, canActivateChild: [AuthGuard] },
      { path: 'content', component: ContentComponent, canActivateChild: [AuthGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }