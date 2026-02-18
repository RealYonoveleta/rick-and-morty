import { Component, effect, ElementRef, input, ViewChild } from '@angular/core';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-json';
import { Detail } from '../../../model/detail';
import { Model } from '../../../model/model';

@Component({
  selector: 'app-json-detail',
  imports: [],
  templateUrl: './json-detail.html',
  styleUrl: './json-detail.css',
})
export class JsonDetail implements Detail<Model> {
  result = input<Model>();
  @ViewChild('code') code!: ElementRef;

  constructor() {
    effect(() => {
      const value = this.result();
      if (this.code && value !== null) {
        const json = JSON.stringify(this.result(), null, 2);
        this.code.nativeElement.textContent = json;
        Prism.highlightElement(this.code.nativeElement);
      }
    });
  }
}
