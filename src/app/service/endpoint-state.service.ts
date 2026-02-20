import { effect, Injectable, signal } from '@angular/core';
import { Model } from '../model/model';
import { ApiService } from './api-service';

@Injectable({
  providedIn: 'root',
})
export class EndpointStateService {
  private endpointService = signal<ApiService<Model> | null>(null);

  resetEndpointService = effect(() => {
    const service = this.endpointService();
    service?.search('');
  });

  setEndpointService(service: ApiService<Model>) {
    this.endpointService.set(service);
  }

  getEndpointService() {
    return this.endpointService.asReadonly();
  }
}
