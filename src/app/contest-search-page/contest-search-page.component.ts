import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api/api.service';
import { ContestSearchSettingsComponent } from '../contest-search-settings/contest-search-settings.component';
import { ContestListItemComponent } from '../contest-list-item/contest-list-item.component';
import {MatList, MatListModule} from '@angular/material/list'
import { ContestSearchResult, ContestSearchSettings, ContestParticipation } from '../interfaces/settings';
import { Contest } from '../interfaces/contest';
import { CfmethodsService } from '../services/cfmethods/cfmethods.service';


@Component({
  selector: 'app-contest-search-page',
  standalone: true,
  imports: [
    ContestSearchSettingsComponent, MatListModule, ContestListItemComponent, CommonModule
  ],
  templateUrl: './contest-search-page.component.html',
  styleUrl: './contest-search-page.component.scss'
})
export class ContestSearchPageComponent implements OnInit {

  contests : ContestSearchResult[] = [];
  loading : boolean = true;
  error : boolean = false;

  searchContests(settings : ContestSearchSettings) : void {
    this.loading = true;
    this.error = false;
    console.log(settings);
    this.cf.getValidContests(settings).subscribe(
      (res) => {
        this.contests = res;
        this.loading = false;
        console.log(this.contests);
      },
      (error) => {
        this.loading = false;
        console.log(error);
        this.error = true;
      }
    )
  }

  ngOnInit(): void {
    this.searchContests(
      {
        usernames: [],
        divisions: [1, 2, 3, 4],
        pariticipation : ContestParticipation.ANY
      }
    );
  }

  constructor(private cf : CfmethodsService) {
 
  }
}
