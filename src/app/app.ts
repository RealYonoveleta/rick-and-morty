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
export class App {}
