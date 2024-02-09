import { TestBed } from '@angular/core/testing';

import { CfmethodsService } from './cfmethods.service';

describe('CfmethodsService', () => {
  let service: CfmethodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CfmethodsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
