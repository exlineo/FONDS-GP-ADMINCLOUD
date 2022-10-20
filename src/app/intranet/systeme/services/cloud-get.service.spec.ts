import { TestBed } from '@angular/core/testing';

import { CloudGetService } from './cloud-get.service';

describe('CloudGetService', () => {
  let service: CloudGetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloudGetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
