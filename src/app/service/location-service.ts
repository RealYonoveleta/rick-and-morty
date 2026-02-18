import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { Location } from '../model/location';

@Injectable({
  providedIn: 'root',
})
export class LocationService extends ApiService<Location> {
  protected override endpoint: string = 'location';
}
