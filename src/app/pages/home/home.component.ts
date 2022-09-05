import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PostService } from 'src/app/services/post.service';
import { PostModel } from './post-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts: Array<PostModel> = [];
  constructor(private postService: PostService) { 
    this.postService.getAllPost().subscribe(post => {
      this.posts = post;
    });
  }

  ngOnInit(): void {
   
  }

}
