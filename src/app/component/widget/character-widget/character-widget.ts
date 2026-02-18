import { TitleCasePipe } from '@angular/common';
import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Character } from '../../../model/character';
import { Episode } from '../../../model/episode';
import { Widget } from '../../../model/widget';
import { EpisodeService } from '../../../service/episode-service';

@Component({
  selector: 'app-character-widget',
  imports: [MatIconModule, TitleCasePipe],
  templateUrl: './character-widget.html',
  styleUrls: ['./character-widget.css'],
  host: {
    class: 'widget'
  }
})
export class CharacterWidget implements Widget<Character> {
  result = input<Character>();
  selected = output<Character>();
  
  private episodes = inject(EpisodeService);
  readonly location = computed(() => this.result()?.location.name);
  readonly firstSeen = signal<Episode | null>(null);

  constructor() {
    effect(() => {
      const character = this.result();
      if (!character) return;

      this.episodes.get(character.episode[0])
        .subscribe(episode => this.firstSeen.set(episode));
    });
  }
}