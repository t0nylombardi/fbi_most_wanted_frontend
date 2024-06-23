export interface Image {
  caption: string | null | undefined;
  large: string | null | undefined;
}

export interface WantedPerson {
  id: string;
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
  sex: string | null;
  title: string | null;
  url: string | null;
  weight_max: number | null;
  weight_min: number | null;
  [key: string]: string | number | null | undefined | Image[];
  [key: number]: string | number | null | undefined | Image[];
}

export interface PersonDetails {
  age_range: string | null | undefined;
  eyes: string | null | undefined;
  hair: string | null | undefined;
  height_max: number | null | undefined;
  place_of_birth: string | null | undefined;
  race: string | null | undefined;
  sex: string | null | undefined;
  weight_max: number | null | undefined;
}

export interface ApiResponse {
  total: number;
  items: WantedPerson[];
}
