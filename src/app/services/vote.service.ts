import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VotePayload } from '../pages/vote-button/vote-payload';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http:HttpClient) { }

  vote(votePayload:VotePayload){
    return this.http.post('http://localhost:8080/api/votes',votePayload)
  }
}
