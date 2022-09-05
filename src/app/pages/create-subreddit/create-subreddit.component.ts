import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SubredditService } from 'src/app/services/subreddit.service';
import { SubredditPayload } from './subreddit.payload';

@Component({
  selector: 'app-create-subreddit',
  templateUrl: './create-subreddit.component.html',
  styleUrls: ['./create-subreddit.component.css']
})
export class CreateSubredditComponent implements OnInit {


  createSubredditForm:FormGroup
  subredditPayload:SubredditPayload

  constructor(private router:Router,private subredditService:SubredditService) { 
    this.subredditPayload={
      name:'',
      description:''
    }
  }

  ngOnInit(): void {
    this.createSubredditForm = new FormGroup({
      title:new FormControl('',Validators.required),
      description:new FormControl('',Validators.required)
    })
  }

  createSubreddit(){
    this.subredditPayload.name=this.createSubredditForm.get('title').value
    this.subredditPayload.description=this.createSubredditForm.get('description').value
    this.subredditService.createSubreddit(this.subredditPayload).subscribe(
      (data)=>{
        this.router.navigateByUrl('/list-subreddits');

      },
      (error)=>{throw error}
    )
  }
  discard(){
    this.router.navigateByUrl('/')
  }

}
