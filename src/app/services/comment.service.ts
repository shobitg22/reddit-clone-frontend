import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentPayload } from '../pages/view-post/comment.payload';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  getAllCommentsByUser(name: string) {
    return this.http.get<Array<CommentPayload>>('http://localhost:8080/api/comments/user/'+name);
  }

  constructor(private http:HttpClient) { }

  getCommentsByPost(postId:number):Observable<Array<CommentPayload>>{
    return this.http.get<Array<CommentPayload>>('http://localhost:8080/api/comments/post/'+postId);
  }

  createComment(comment:CommentPayload):Observable<any>{
    return this.http.post<any>('http://localhost:8080/api/comments/', comment);
  }
}
