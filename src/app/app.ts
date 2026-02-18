import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './component/footer/footer';
import { Header } from './component/header/header';
import { CharacterService } from './service/character-service';
import { EpisodeService } from './service/episode-service';
import { LocationService } from './service/location-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Header],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  constructor(
    private readonly characters: CharacterService,
    private readonly locations: LocationService,
    private readonly episodes: EpisodeService,
  ) {}

  ngOnInit(): void {
    this.characters.load();
    this.locations.load();
    this.episodes.load();
  }
}
