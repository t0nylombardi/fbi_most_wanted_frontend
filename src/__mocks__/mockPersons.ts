import { WantedPerson } from "../services/types";

const mockPersons: WantedPerson[] = [
  {
    id: "1",
    title: "John Doe",
    details: "Details of Wanted Person",
    description: "Description of a Wanted Person",
    caution: "Caution of a Wanted Person",
    height_min: 170,
    weight_min: 70,
    url: "url",
    images: [{ large: "image-url-1", caption: "This is John Doe" }],
    age_range: "25-30",
    eyes: "Blue",
    hair: "Blonde", // Ensure this matches the initial state
    height_max: 180,
    place_of_birth: "New York",
    race: "Caucasian",
    sex: "Male",
    weight_max: 75,
    subjects: ["Cyber's Most Wanted"],
  },
  {
    id: "2",
    title: "Person 2",
    details: "Details of Person 2",
    description: "Description of a Wanted Person",
    caution: "Caution of a Wanted Person",
    height_min: 120,
    weight_min: 100,
    url: "url",
    images: [{ large: "image-url-1", caption: "This is Person 2" }],
    age_range: "25-30",
    eyes: "Blue",
    hair: "red", // Ensure this matches the initial state
    height_max: 180,
    place_of_birth: "New York",
    race: "Caucasian",
    sex: "Female",
    weight_max: 75,
    subjects: ["ViCAP Missing Persons"],
  },
];

export default mockPersons;
