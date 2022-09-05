import { Component, OnInit } from '@angular/core';
import { SubredditService } from 'src/app/services/subreddit.service';
import { SubredditModel } from '../home/subreddit-model';

@Component({
  selector: 'app-subreddit-side-bar',
  templateUrl: './subreddit-side-bar.component.html',
  styleUrls: ['./subreddit-side-bar.component.css']
})
export class SubredditSideBarComponent implements OnInit {

  subreddit:Array<SubredditModel>=[];
  displayViewAll: boolean;
  constructor(private subredditService: SubredditService) {
    this.subredditService.getAllSubreddits().subscribe(data => {
      if (data.length > 3) {
        this.subreddit = data.splice(0, 3);
        this.displayViewAll = true;
      } else {
        this.subreddit = data;
      }
    });
   }

  ngOnInit(): void {
   

  }

}
