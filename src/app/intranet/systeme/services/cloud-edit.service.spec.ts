import { TestBed } from '@angular/core/testing';

import { CloudEditService } from './cloud-edit.service';

describe('CloudEditService', () => {
  let service: CloudEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloudEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
