import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { endpointResolver } from './endpoint-resolver';

describe('endpointResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => endpointResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
