import { Injectable } from '@angular/core';
import { Character } from '../model/character';
import { ApiService } from './api-service';

@Injectable({
  providedIn: 'root',
})
export class CharacterService extends ApiService<Character> {
  protected override endpoint: string = 'character';
}

