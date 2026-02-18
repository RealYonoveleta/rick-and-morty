import { Model } from "./model";

export interface Location extends Model {
   id: number;
   name: string;
   type: string;
   dimension: string;
   residents: string[];
   url: string;
   created: string; 
}
