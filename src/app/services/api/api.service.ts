import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, delay, filter, forkJoin, map, switchMap } from 'rxjs';

import { Contest } from '../../interfaces/contest';
import { Submission, UserSubmissions } from '../../interfaces/submission';

import { API_PREFIX, MAX_SUBMISSIONS } from '../../interfaces/constants';
import { ContestParticipation, ContestSearchSettings, ContestSearchResult } from '../../interfaces/settings';

import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  createContestItem(contestObject : any) : Contest {
    let item : Contest = {
      id : contestObject.id,
      name : contestObject.name,
      url : `https://codeforces.com/contest/${contestObject.id}`,
      type : contestObject.type,
      divisions : []
    }

    for(let i = 1; i <= 4; i++){
      if(item.name.includes(`Div. ${i}`)){
        item.divisions.push(i);
      }
    };
    return item;
  }

  getAllContests() : Observable<Contest[]> {
    return this.http.get<Contest[]>(
     `${API_PREFIX}/contest.list?gym=false`,
    ).pipe(
      map(
        (res : any) => {
          let result : Contest[] = [];
          if(res.status === "OK"){
            let contests : any[] = res.result;
            for(let i = 0; i < contests.length; i++){
              if(contests[i].phase === "FINISHED"){
                result.push(this.createContestItem(contests[i]));
              }
            }
          }
          return result;
        }
      )
    );
  }

  delayObservable<T>(observable: Observable<T>, duration: number) {
    return of('').pipe(
      delay(duration),
      switchMap(() => observable)
    );
  }

  filterUsernames(usernames : string[]) : string[] {
    let filteredResults = usernames.filter((name : string) => name.length >= 3 && name.length <= 24);
    return [... new Set(filteredResults)];
  }

  getUserSubmissions(usernames : string[]) : Observable<UserSubmissions[]> {

    usernames = this.filterUsernames(usernames);
    if(usernames.length === 0 || usernames.length > 25){
      return of([]);
    }

    let requests : Observable<any>[] = [];
    let delayTime : number = 0;

    for(let i = 0; i < usernames.length; i++){
      if(usernames[i]){
        requests.push (
          this.delayObservable(
            this.http.get(
              `${API_PREFIX}/user.status?handle=${usernames[i]}&from=1&count=${MAX_SUBMISSIONS}`
            ), delayTime
          )
        );
        delayTime += 1000;
      }
    }
    

    return forkJoin(requests).pipe(
      map(
        (res : any) => {
          let result : UserSubmissions[] = [];
          for(let i = 0; i < res.length; i++){
            if(res[i].status === "OK"){
              let submissions : Submission[] = res[i].result.map(
                (item : any) => {
                  let submission : Submission = {
                    verdict: item.verdict,
                    problem: {
                      id : item.problem.contestId,
                      index : item.problem.index,
                      name : item.problem.name,
                      rating : item.problem.rating,
                      tags : item.problem.tags
                    }
                  }
                  return submission;
                }
              )
              result.push({
                username : usernames[i],
                submissions : submissions
              });
            }
          }
          //console.log(result);
          return result;
      })
    )
  }

  constructor(private http: HttpClient) { 

  }
}
