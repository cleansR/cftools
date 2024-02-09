import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable, filter, forkJoin, map } from 'rxjs';

import { Contest } from '../../interfaces/contest';
import { Submission, UserSubmissions } from '../../interfaces/submission';

import { API_PREFIX, MAX_SUBMISSIONS } from '../../interfaces/constants';
import { ContestParticipation, ContestSearchSettings, ContestSearchResult } from '../../interfaces/settings';
import { coerceNumberProperty } from '@angular/cdk/coercion';

@Injectable({
  providedIn: 'root'
})
export class CfmethodsService {

  valid(settings : ContestSearchSettings, validContestIds : Map<number, string>, contest : Contest) : boolean {
    let valid : boolean = false;
    let divisions : number[] = settings.divisions;
    for(let i = 0; i < divisions.length; i++){
      valid = valid || contest.divisions.includes(divisions[i]);
    }

    valid = valid && validContestIds.has(contest.id);
    return valid;
  }

  potentiallyInvalid(contest : Contest, invalidNames : Set<string>) : boolean {
    let invalid : boolean = false;
    if(contest.divisions.length === 1){
      for(let i = 1; i <= 4; i++){
        if(i !== contest.divisions[i]){
          let searchName = contest.name.replace(`Div. ${contest.divisions[0]}`, `Div. ${i}`);
          invalid = invalid || (invalidNames.has(searchName));
        }
      }
    }
    return invalid;
  }

  getValidContests(settings : ContestSearchSettings) : Observable<ContestSearchResult[]> {
    let requests : Observable<any>[] = [
      this.api.getAllContests(),
      this.api.getUserSubmissions(settings.usernames)
    ];

    return forkJoin(requests).pipe(
      map(
        ([contests, userSubmissions]) => {

          let validContestIds : Map<number, string> = new Map<number, string>();
          let badContestNames : Set<string> = new Set<string>();

          for(let i = 0; i < contests.length; i++){
            validContestIds.set(contests[i].id, contests[i].name);
          }

          for(let i = 0; i < userSubmissions.length; i++){
            let submissions : Submission[] = userSubmissions[i].submissions;
            for(let j = 0; j < submissions.length; j++){
              if(settings.pariticipation == ContestParticipation.NO_SOLVED){
                if(submissions[j].verdict === "OK"){
                  let contestName : string | undefined = validContestIds.get(submissions[j].problem.id);
                  if(contestName){
                    badContestNames.add(contestName);
                    validContestIds.delete(submissions[j].problem.id);
                  }
                }
              }
              else if(settings.pariticipation == ContestParticipation.NO_SUBMISSIONS){
                let contestName : string | undefined = validContestIds.get(submissions[j].problem.id);
                if(contestName){
                  badContestNames.add(contestName);
                  validContestIds.delete(submissions[j].problem.id);
                }
              }
            }
          }

          let filteredContests : Contest[] = contests.filter(
            (contest : Contest) => {
              return this.valid(settings, validContestIds, contest);
            }
          );

          let result : ContestSearchResult[] = filteredContests.map(
            (contest : Contest) => {
              let item : ContestSearchResult = {
                contest : contest,
                warning : this.potentiallyInvalid(contest, badContestNames)
              }
              return item;
            }
          );
          
          return result;
        }
      )
    );
  }

  constructor(private api : ApiService) { }
}
