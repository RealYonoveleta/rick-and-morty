import { Routes } from '@angular/router';
import { EndpointList } from './component/endpoint-list/endpoint-list';
import { endpointResolver } from './features/endpoint-resolver';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'character',
    pathMatch: 'full',
  },
  {
    path: ':endpoint',
    component: EndpointList,
    resolve: {
      endpoint: endpointResolver,
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];