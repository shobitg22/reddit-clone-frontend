import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubredditPayload } from '../pages/create-subreddit/subreddit.payload';
import { SubredditModel } from '../pages/home/subreddit-model';

@Injectable({
  providedIn: 'root'
})
export class SubredditService {

  constructor(private http:HttpClient) { }

  getAllSubreddits(): Observable<Array<SubredditModel>> {
    return this.http.get<Array<SubredditModel>>('http://localhost:8080/api/subreddit');
  }

  createSubreddit(subredditPayload:SubredditPayload):Observable<SubredditPayload>{
    return this.http.post<SubredditPayload>('http://localhost:8080/api/subreddit',subredditPayload);

  }
}
