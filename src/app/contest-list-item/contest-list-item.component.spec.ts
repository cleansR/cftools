import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestListItemComponent } from './contest-list-item.component';

describe('ContestListItemComponent', () => {
  let component: ContestListItemComponent;
  let fixture: ComponentFixture<ContestListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContestListItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContestListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
