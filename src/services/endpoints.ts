import { fetchData } from "./api";
import { WantedPerson } from "./types";

const processWantedPersons = (data: WantedPerson[]): WantedPerson[] => {
  if (!data) return [];
  // if data is not an array, return it as an array
  if (!Array.isArray(data)) return [data];
  return data.map((item: WantedPerson) => ({
    id: item.id,
    age_range: item.age_range,
    details: item.details,
    description: item.description,
    eyes: item.eyes,
    hair: item.hair,
    height_max: item.height_max,
    height_min: item.height_min,
    images: item.images,
    place_of_birth: item.place_of_birth,
    race: item.race,
    sex: item.sex,
    title: item.title,
    url: item.url,
    weight_max: item.weight_max,
    weight_min: item.weight_min,
  }));
};

const createData = (endpoint: string, data: WantedPerson): Promise<WantedPerson> =>
  fetchData<WantedPerson>(endpoint, "POST", data);
const readData = (endpoint: string): Promise<WantedPerson[]> => {
  console.log("endpoint: ", fetchData<WantedPerson[]>(endpoint));
  return fetchData<WantedPerson[]>(endpoint);
};
const updateData = (endpoint: string, data: WantedPerson): Promise<WantedPerson> =>
  fetchData<WantedPerson>(endpoint, "PUT", data);
const deleteData = (endpoint: string, id: string): Promise<void> =>
  fetchData<void>(`${endpoint}/${id}`, "DELETE");

export const tenMostWanted = {
  create: (data: WantedPerson) => createData("/ten_most_wanted", data),
  read: async (): Promise<WantedPerson[]> =>
    processWantedPersons(await readData("/ten_most_wanted")),
  update: (data: WantedPerson) => updateData("/ten_most_wanted", data),
  delete: (id: string) => deleteData("/ten_most_wanted", id),
};

export const wanted = {
  create: (data: WantedPerson) => createData("/wanted", data),
  read: async (): Promise<WantedPerson[]> => processWantedPersons(await readData("/wanted")),
  update: (data: WantedPerson) => updateData("/wanted", data),
  delete: (id: string) => deleteData("/wanted", id),
};

export const terrorist = {
  create: (data: WantedPerson) => createData("/terrorist", data),
  read: async (): Promise<WantedPerson[]> => processWantedPersons(await readData("/terrorist")),
  update: (data: WantedPerson) => updateData("/terrorist", data),
  delete: (id: string) => deleteData("/terrorist", id),
};

export const seekingInformation = {
  create: (data: WantedPerson) => createData("/seeking_information", data),
  read: async (): Promise<WantedPerson[]> =>
    processWantedPersons(await readData("/seeking_information")),
  update: (data: WantedPerson) => updateData("/seeking_information", data),
  delete: (id: string) => deleteData("/seeking_information", id),
};

export const kidnappings = {
  create: (data: WantedPerson) => createData("/kidnappings", data),
  read: async (): Promise<WantedPerson[]> => processWantedPersons(await readData("/kidnappings")),
  update: (data: WantedPerson) => updateData("/kidnappings", data),
  delete: (id: string) => deleteData("/kidnappings", id),
};

export const missingPersons = {
  create: (data: WantedPerson) => createData("/missing_persons", data),
  read: async (): Promise<WantedPerson[]> =>
    processWantedPersons(await readData("/missing_persons")),
  update: (data: WantedPerson) => updateData("/missing_persons", data),
  delete: (id: string) => deleteData("/missing_persons", id),
};

export const caseOfTheWeek = {
  create: (data: WantedPerson) => createData("/case_of_the_week", data),
  read: async (): Promise<WantedPerson[]> =>
    processWantedPersons(await readData("/case_of_the_week")),
  update: (data: WantedPerson) => updateData("/case_of_the_week", data),
  delete: (id: string) => deleteData("/case_of_the_week", id),
};
