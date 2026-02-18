import { Component, inject, signal } from '@angular/core';
import { CharacterService } from '../../service/character-service';
import { LocationService } from '../../service/location-service';
import { EpisodeService } from '../../service/episode-service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  private characters = inject(CharacterService);
  private locations = inject(LocationService);
  private episodes = inject(EpisodeService);
  readonly characterCount = this.characters.count;
  readonly locationCount = this.locations.count;
  readonly episodeCount = this.episodes.count;
}
