import { Component, OnInit } from '@angular/core';
import { SubredditService } from 'src/app/services/subreddit.service';
import { SubredditPayload } from '../create-subreddit/subreddit.payload';
import { SubredditModel } from '../home/subreddit-model';

@Component({
  selector: 'app-show-subreddits',
  templateUrl: './show-subreddits.component.html',
  styleUrls: ['./show-subreddits.component.css']
})
export class ShowSubredditsComponent implements OnInit {

  subreddits:Array<SubredditModel>=[]

  constructor(private subrediitService:SubredditService) { }

  ngOnInit(): void {
    this.subrediitService.getAllSubreddits().subscribe(
      (data)=>{
        this.subreddits=data;
      },
      (error)=>{
        throw error;
        
      }
    )
  }

}
