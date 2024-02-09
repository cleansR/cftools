import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list'

import { ContestSearchResult } from '../interfaces/settings';
import { MatIconModule } from '@angular/material/icon'
import {MatTooltipModule} from '@angular/material/tooltip'

@Component({
  selector: 'app-contest-list-item',
  standalone: true,
  imports: [MatListModule, MatIconModule, CommonModule, MatTooltipModule],
  templateUrl: './contest-list-item.component.html',
  styleUrl: './contest-list-item.component.scss'
})
export class ContestListItemComponent {
  @Input() searchResult : ContestSearchResult | undefined;
  mouseHover : boolean = false;
}
