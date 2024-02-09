import { Component, Output, EventEmitter} from '@angular/core';
import { ContestSearchSettings, ContestParticipation } from '../interfaces/settings';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select'
import {MatChipsModule} from '@angular/material/chips'
import {MatButtonModule} from '@angular/material/button'

import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contest-search-settings',
  standalone: true,
  imports: [
    MatInputModule, MatFormFieldModule, MatSelectModule, MatChipsModule, MatButtonModule, ReactiveFormsModule
  ],
  templateUrl: './contest-search-settings.component.html',
  styleUrl: './contest-search-settings.component.scss'
})
export class ContestSearchSettingsComponent {
  @Output() onSearchButtonPressed : EventEmitter<ContestSearchSettings> = new EventEmitter<ContestSearchSettings>();

  usernames : FormControl = this.fb.control("");
  divisions : FormControl = this.fb.control([], [Validators.required]);
  tried : FormControl = this.fb.control([], [Validators.required]);

  form : FormGroup = this.fb.group(
    {
      usernames : this.usernames,
      divisions: this.divisions,
      tried : this.tried
    }
  )

  search() : void {

    if(this.form.valid) {

      let usernames : string[] = this.usernames.value.split(" ");
      let participationValue : ContestParticipation = (
        (this.tried.value === "Doesn't Matter" ? ContestParticipation.ANY : 
          (
            this.tried.value === "No Submissions" ? ContestParticipation.NO_SUBMISSIONS : ContestParticipation.NO_SOLVED
          )
        )
      );
   
      this.onSearchButtonPressed.emit(
      {
        usernames : usernames,
        divisions : this.divisions.value.map((value : string) => parseInt(value)),
        pariticipation : participationValue
      }
    )
    }
    else{
      console.log("FORM INVALID");
    }
  }

  constructor(private fb: FormBuilder) {

  }
}
