import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';
import { PostModel } from '../home/post-response';
import { CommentPayload } from '../view-post/comment.payload';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  name: string;
  posts: PostModel[];
  comments: CommentPayload[];
  postLength: number;
  commentLength: number;
  
  constructor(private activatedRoute: ActivatedRoute, private postService: PostService,
    private commentService: CommentService) {

      this.name = this.activatedRoute.snapshot.params['name'];
        console.log(this.name)
      this.postService.getPostByUser(this.name).subscribe(data => {
        this.posts = data;
        this.postLength = data.length;
      });
      this.commentService.getAllCommentsByUser(this.name).subscribe(data => {
        this.comments = data;
        this.commentLength = data.length;
      });

     }

  ngOnInit(): void {
  }

}
