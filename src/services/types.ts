// src/services/types.ts

export interface Image {
  caption: string;
  large: string;
  original: string;
  thumb: string;
}

export interface WantedPerson {
  age_range: string | null;
  details: string | null;
  description: string | null;
  eyes: string | null;
  hair: string | null;
  height_max: number | null;
  height_min: number | null;
  images: Image[];
  place_of_birth: string | null;
  race: string | null;
  sex: string;
  title: string;
  url: string;
  weight_max: number | null;
  weight_min: number | null;
}

export interface ApiResponse {
  total: number;
  items: WantedPerson[];
}
