import { ResolveFn } from '@angular/router';
import { EndpointMapper, EndpointMapping } from './endpoint-mapper';
import { inject } from '@angular/core';

export const endpointResolver: ResolveFn<EndpointMapping> = (route) => {
  const mapper = inject(EndpointMapper);
  const endpoint = route.paramMap.get('endpoint');
  return endpoint ? mapper.resolve(endpoint) : mapper.resolveDefault();
};
