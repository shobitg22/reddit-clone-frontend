import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PostModel } from '../home/post-response';
import {MatIconRegistry} from '@angular/material/icon';
import { VoteType } from './vote-type';
import { VotePayload } from './vote-payload';
import { VoteService } from 'src/app/services/vote.service';
import { ToastrService } from 'ngx-toastr';
import { PostService } from 'src/app/services/post.service';


@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {



  @Input() post:PostModel;
  votePayload:VotePayload
  upvoteColor: string;
  downvoteColor: string;

  constructor(private voteService:VoteService,private toastr: ToastrService,
    private postService:PostService) { 
    this.votePayload = {
      voteType: undefined,
      postId: undefined
    }
  }

  ngOnInit(): void {
  }

  upVote(){
    this.votePayload.voteType=VoteType.UPVOTE
    this.vote()
    this.upvoteColor='green'
    this.downvoteColor=''
  }
  downVote(){

    this.votePayload.voteType=VoteType.DOWNVOTE
    this.vote()
    this.downvoteColor='red'
    this.upvoteColor=''
  }

  vote(){
    this.votePayload.postId=this.post.id
    this.voteService.vote(this.votePayload).subscribe(
      (data)=>{
        this.updateVoteDetails()
      },
      (error)=>{ console.log(error)
        this.toastr.error('No Duplicates vote allowed');}
    )
  }
  private updateVoteDetails(){
    this.postService.getPostById(this.post.id).subscribe(
      (data)=>{
        this.post=data
      },
      (error)=>{ console.log(error)
        this.toastr.error('No post found with the id '+this.post.id);}
    )
  }

}
