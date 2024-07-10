import { fetchData } from "./api";
import { PersonDetails, WantedPerson } from "./types";

const createData = async (endpoint: string, data: WantedPerson): Promise<WantedPerson> => {
  const response = await fetchData<WantedPerson>(endpoint, "POST", data);
  return response.data;
};

export const processWantedPersons = (data: WantedPerson[]): WantedPerson[] => {
  if (!data) return [];
  if (!Array.isArray(data)) return [data];
  return data.map((item: WantedPerson) => ({
    id: item.id,
    age_range: item.age_range,
    details: item.details,
    description: item.description,
    caution: item.caution,
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

const readData = async (endpoint: string): Promise<WantedPerson[]> => {
  const response = await fetchData<WantedPerson[]>(endpoint);
  return response.data;
};

const updateData = async (
  endpoint: string,
  id: string,
  data: PersonDetails,
): Promise<WantedPerson | null> => {
  try {
    const response = await fetchData<WantedPerson>(`${endpoint}/${id}`, "PUT", data);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error updating data at ${endpoint}/${id}:`, error.message);
    } else {
      console.error(`Unexpected error updating data at ${endpoint}/${id}:`, error);
    }

    return null;
  }
};

const deleteData = async (endpoint: string, id: string): Promise<void> => {
  await fetchData<void>(`${endpoint}/${id}`, "DELETE");
};

export const wanted = {
  create: (data: WantedPerson) => createData("/default_all_pages", data),
  read: async (): Promise<WantedPerson[]> =>
    processWantedPersons(await readData("/default_all_pages")),
  update: (id: string, data: PersonDetails) => updateData("/default_all_pages", id, data),
  delete: (id: string) => deleteData("/default_all_pages", id),
};
