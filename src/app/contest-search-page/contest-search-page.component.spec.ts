import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestSearchPageComponent } from './contest-search-page.component';

describe('ContestSearchPageComponent', () => {
  let component: ContestSearchPageComponent;
  let fixture: ComponentFixture<ContestSearchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContestSearchPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContestSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
