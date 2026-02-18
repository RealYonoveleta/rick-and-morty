import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { Episode } from '../model/episode';

@Injectable({
  providedIn: 'root',
})
export class EpisodeService extends ApiService<Episode> {
  protected override endpoint: string = 'episode';
}
