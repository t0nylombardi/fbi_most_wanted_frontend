import { WantedPerson } from "../services/types";

const mockPersons: WantedPerson[] = [
  {
    id: "1",
    title: "John Doe",
    details: "Details of Wanted Person",
    height_min: 170,
    weight_min: 70,
    url: "url",
    description: "Description of a Wanted Person",
    images: [{ large: "image-url-1", caption: "This is a caption" }],
    age_range: "25-30",
    eyes: "Blue",
    hair: "Blonde",
    height_max: 180,
    place_of_birth: "New York",
    race: "Caucasian",
    sex: "Male",
    weight_max: 75,
    subjects: ["John", "Doe"],
  },
  {
    id: "2",
    title: "Person 2",
    details: "Details of Person 2",
    height_min: 120,
    weight_min: 100,
    url: "url",
    description: "Description of a Wanted Person",
    images: [{ large: "image-url-1", caption: "This is a caption" }],
    age_range: "25-30",
    eyes: "Blue",
    hair: "Blonde",
    height_max: 180,
    place_of_birth: "New York",
    race: "Caucasian",
    sex: "Female",
    weight_max: 75,
    subjects: ["Jane", "Doe"],
  },
];

export default mockPersons;
