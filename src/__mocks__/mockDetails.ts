import { PersonDetails } from "../services/types";

const mockDetails: PersonDetails = {
  age_range: "30-40",
  details: "Updated Details",
  description: "Updated Description",
  caution: "Updated Caution",
  eyes: "Blue",
  hair: "Blonde",
  height_max: "185cm",
  weight_max: "85kg",
  place_of_birth: "Los Angeles",
  race: "Asian",
  sex: "Female",
  images: [
    {
      large: "image-url-1",
      caption: "This is John Doe",
    },
  ],
};

export default mockDetails;
