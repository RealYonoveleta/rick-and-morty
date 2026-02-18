import { Signal } from "@angular/core";
import { Model } from "./model";

export interface Detail<T extends Model> {
  result: Signal<T | undefined>;
}
