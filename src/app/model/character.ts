import { Model } from "./model";

interface Location {
    name: string;
    url: string;
}

export interface Character extends Model {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: Location;
    location: Location;
    image: string;
    episode: string[];
    url: string;
    created: string;
}
