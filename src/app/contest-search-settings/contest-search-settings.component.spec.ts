import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestSearchSettingsComponent } from './contest-search-settings.component';

describe('ContestSearchSettingsComponent', () => {
  let component: ContestSearchSettingsComponent;
  let fixture: ComponentFixture<ContestSearchSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContestSearchSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContestSearchSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
