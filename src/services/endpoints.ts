import { fetchData } from "./api";
import { PersonDetails, WantedPerson } from "./types";

const processWantedPersons = (data: WantedPerson[]): WantedPerson[] => {
  // if data is not an array, return it as an array
  if (!data) return [];

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
    modified: item.modified,
    subjects: item.subjects,
  }));
};

const createData = (endpoint: string, data: WantedPerson): Promise<WantedPerson> =>
  fetchData<WantedPerson>(endpoint, "POST", data);

const readData = async (endpoint: string): Promise<WantedPerson[]> => {
  return await fetchData<WantedPerson[]>(endpoint);
};

const updateData = (endpoint: string, id: string, data: PersonDetails): Promise<WantedPerson> =>
  fetchData<WantedPerson>(`${endpoint}/${id}`, "PUT", data);

const deleteData = (endpoint: string, id: string): Promise<void> =>
  fetchData<void>(`${endpoint}/${id}`, "DELETE");

export const tenMostWanted = {
  create: (data: WantedPerson) => createData("/ten_most_wanted", data),
  read: async (): Promise<WantedPerson[]> =>
    processWantedPersons(await readData("/ten_most_wanted")),
  update: (id: string, convertedDetails: Partial<PersonDetails>, data: WantedPerson) =>
    updateData("/ten_most_wanted", id, data),
  delete: (id: string) => deleteData("/ten_most_wanted", id),
};

export const wanted = {
  create: (data: WantedPerson) => createData("/default_all_pages", data),
  read: async (): Promise<WantedPerson[]> =>
    processWantedPersons(await readData("/default_all_pages")),
  update: (id: string, data: PersonDetails) => updateData("/default_all_pages", id, data),
  delete: (id: string) => deleteData("/default_all_pages", id),
};

export const terrorist = {
  create: (data: WantedPerson) => createData("/terrorist", data),
  read: async (): Promise<WantedPerson[]> => processWantedPersons(await readData("/terrorist")),
  update: (id: string, data: WantedPerson) => updateData("/terrorist", id, data),
  delete: (id: string) => deleteData("/terrorist", id),
};
