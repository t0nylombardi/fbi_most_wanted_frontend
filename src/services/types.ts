export interface Image {
  caption: string | null | undefined;
  large: string | null | undefined;
}

export interface WantedPerson {
  id: string;
  age_range: string | number | null | undefined;
  details: string | null | undefined;
  description: string | null | undefined;
  caution: string | null | undefined;
  eyes: string;
  hair: string;
  images: Image[];
  place_of_birth: string;
  race: string;
  sex: string;
  title: string;
  url: string;
  height_max: number | string | null | undefined;
  height_min: number | string | null | undefined;
  weight_max: number | string | null | undefined;
  weight_min: number | string | null | undefined;
  subjects: string[];
  [key: string]: string | string[] | number | null | undefined | Image[];
  [key: number]: string | number | null | undefined | Image[];
}

export interface PersonDetails {
  age_range?: string | null | undefined;
  eyes?: string | null | undefined;
  hair?: string | null | undefined;
  height_max?: number | string | null | undefined;
  weight_max?: number | string | null | undefined;
  place_of_birth?: string | null | undefined;
  race?: string | null | undefined;
  sex?: string | null | undefined;
  details: string | null | undefined;
  description: string | null | undefined;
  caution: string | null | undefined;
}

export interface ApiResponse {
  total: number;
  items: WantedPerson[];
}

export interface User {
  username: string;
  password: string;
  description: string;
  token: string;
  image: {
    thumb: string;
    default: string;
  };
  promises: string[];
  website: string;
}
