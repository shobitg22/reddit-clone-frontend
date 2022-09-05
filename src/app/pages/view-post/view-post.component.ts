import { Comment } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';
import { PostModel } from '../home/post-response';
import { CommentPayload } from './comment.payload';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  postId:number;
  post:PostModel
  commentPayload:CommentPayload
  commentForm: FormGroup;
  comments:Array<CommentPayload>=[]

  constructor(private commentService:CommentService,private route:ActivatedRoute,private postService:PostService) {
    this.commentPayload = {
      text: '',
      postId: this.postId
    };
   }

  ngOnInit(): void {
    this.postId = this.route.snapshot.params['id'];
    this.postService.getPostById(this.postId).subscribe(data => {
      this.post = data;
    }, error => {
      throwError(error);
    });

    this.getCommentsByPost(this.postId);

    this.commentForm = new FormGroup({
      text: new FormControl('', Validators.required)
    });
  }
  postComment(){
    this.commentPayload.text = this.commentForm.get('text').value;
    this.commentPayload.postId=this.postId
    console.log(this.commentPayload)
    this.commentService.createComment(this.commentPayload).subscribe(data => {
      this.commentForm.get('text').setValue('');
      this.getCommentsByPost(this.postId);
    }, error => {
      throwError(error);
    })
  }

  getCommentsByPost(postId){
    this.commentService.getCommentsByPost(postId).subscribe(
      (data)=>{
        this.comments=data},
      (error)=>{throwError(error)}
    )

  }
}
