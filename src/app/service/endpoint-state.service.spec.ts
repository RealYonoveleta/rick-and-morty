import { TestBed } from '@angular/core/testing';

import { EndpointStateService } from './endpoint-state.service';

describe('EndpointStateService', () => {
  let service: EndpointStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EndpointStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
