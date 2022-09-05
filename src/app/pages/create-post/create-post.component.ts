import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { PostService } from 'src/app/services/post.service';
import { SubredditService } from 'src/app/services/subreddit.service';
import { SubredditModel } from '../home/subreddit-model';
import { CreatePostPayload } from './create-post.payload';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  createPostForm:FormGroup
  createPostPayload:CreatePostPayload
  subreddits:Array<SubredditModel>=[]


  constructor(private router:Router,private postService:PostService,private subredditService:SubredditService) { 
    this.createPostPayload={
      postName: '',
      subRedditName:'',
      url: '',
      description: ''
    }
  }

  ngOnInit(): void {
    this.createPostForm= new FormGroup({
      postName: new FormControl('', Validators.required),
      subredditName: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    })
    this.subredditService.getAllSubreddits().subscribe(
      (data)=>{this.subreddits=data},
      (error)=>{throw error}
    )
  }

  createPost(){
    this.createPostPayload.postName = this.createPostForm.get('postName').value;
    this.createPostPayload.subRedditName = this.createPostForm.get('subredditName').value;
    this.createPostPayload.url = this.createPostForm.get('url').value;
    this.createPostPayload.description = this.createPostForm.get('description').value;

    this.postService.createPost(this.createPostPayload).subscribe((data) => {
      console.log(data)
      this.router.navigateByUrl('/');
    }, error => {
      throwError(error);
    })
  }
  discardPost(){
    this.router.navigateByUrl('/');
  }

}
