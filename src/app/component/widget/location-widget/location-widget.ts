import { Component, input, output } from '@angular/core';
import { Location } from '../../../model/location';
import { Widget } from '../../../model/widget';

@Component({
  selector: 'app-location-widget',
  imports: [],
  templateUrl: './location-widget.html',
  styleUrls: ['./location-widget.css'],
  host: {
    class: 'widget',
  },
})
export class LocationWidget implements Widget<Location> {
  result = input<Location>();
  selected = output<Location>();
}
