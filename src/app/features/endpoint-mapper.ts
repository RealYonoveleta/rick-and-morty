import { Injectable, Type } from '@angular/core';
import { CharacterWidget } from '../component/widget/character-widget/character-widget';
import { JsonDetail } from '../component/detail/json-detail/json-detail';
import { EpisodeWidget } from '../component/widget/episode-widget/episode-widget';
import { LocationWidget } from '../component/widget/location-widget/location-widget';
import { Detail } from '../model/detail';
import { Model } from '../model/model';
import { Widget } from '../model/widget';
import { ApiService } from '../service/api-service';
import { CharacterService } from '../service/character-service';
import { EpisodeService } from '../service/episode-service';
import { LocationService } from '../service/location-service';

export interface EndpointMapping {
  service: Type<ApiService<Model>>;
  widget: Type<Widget<Model>>;
  detail: Type<Detail<Model>>;
}

@Injectable({
  providedIn: 'root',
})
export class EndpointMapper {
  private mapper: Record<string, EndpointMapping> = {
    character: { service: CharacterService, widget: CharacterWidget, detail: JsonDetail },
    location: { service: LocationService, widget: LocationWidget, detail: JsonDetail },
    episode: { service: EpisodeService, widget: EpisodeWidget, detail: JsonDetail },
  };

  resolve(endpoint: string): EndpointMapping {
    const mapping = this.mapper[endpoint];

    if (!mapping) {
      throw new Error(`No mapping for endpoint: ${endpoint}`);
    }

    return mapping;
  }

  resolveDefault(): EndpointMapping {
    return this.mapper[Object.keys(this.mapper)[0]];
  }
}
