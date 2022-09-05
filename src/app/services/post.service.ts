import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreatePostPayload } from '../pages/create-post/create-post.payload';
import { PostModel } from '../pages/home/post-response';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  getPostByUser(name: string) {
    return this.http.get<Array<PostModel>>('http://localhost:8080/api/post/username/'+name);

  }

  constructor(private http:HttpClient) { }

  getAllPost(){
    return this.http.get<Array<PostModel>>('http://localhost:8080/api/post');
  }
  getPostById(id:number):Observable<PostModel>{
    return this.http.get<PostModel>('http://localhost:8080/api/post/'+id);

  }
  createPost(post:CreatePostPayload):Observable<PostModel>{
    return this.http.post<PostModel>('http://localhost:8080/api/post',post);
  }
}
