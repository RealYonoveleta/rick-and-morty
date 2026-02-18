import { Component, input, output } from '@angular/core';
import { Episode } from '../../../model/episode';
import { Widget } from '../../../model/widget';

@Component({
  selector: 'app-episode-widget',
  imports: [],
  templateUrl: './episode-widget.html',
  styleUrls: ['./episode-widget.css'],
  host: {
    class: 'widget',
  },
})
export class EpisodeWidget implements Widget<Episode> {
  result = input<Episode>();
  selected = output<Episode>();
}
