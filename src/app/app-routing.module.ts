import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { CreateSubredditComponent } from './pages/create-subreddit/create-subreddit.component';
import { HomeComponent } from './pages/home/home.component';
import { ShowSubredditsComponent } from './pages/show-subreddits/show-subreddits.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ViewPostComponent } from './pages/view-post/view-post.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'user-profile/:name',
    component:UserProfileComponent, canActivate: [AuthGuard]
  },
  {
    path:'view-post/:id',
    component:ViewPostComponent
  },
  {
    path:'list-subreddits',
    component:ShowSubredditsComponent
  },
  {
    path:'create-post',
    component:CreatePostComponent, canActivate: [AuthGuard]
  },
  {
    path:'create-subreddit',
    component:CreateSubredditComponent, canActivate: [AuthGuard]
  },
  {
    path:'signup',
    component:SignupComponent,
  },
  {
    path:"login",
    component:LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
