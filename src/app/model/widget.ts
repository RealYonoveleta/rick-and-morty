import { Signal } from '@angular/core';
import { Model } from './model';

export interface Widget<T extends Model> {
  result: Signal<T | undefined>;
}
