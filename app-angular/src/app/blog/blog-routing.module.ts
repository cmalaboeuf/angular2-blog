import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth.guard';
import { BlogComponent } from './blog.component';
import { PostDetailComponent } from './post/post-detail.component';
import { PostComponent } from './post/post.component';
const routes: Routes = [
  { path: '', component: BlogComponent, children: [
    { path : "ia", component: PostComponent },
    { path : ":slug", component: PostDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }