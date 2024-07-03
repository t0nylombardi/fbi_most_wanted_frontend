// Import necessary functions and types
import { fetchData } from "./api";
import { PersonDetails, WantedPerson } from "./types";

/**
 * Processes an array of WantedPerson data.
 *
 * @param {WantedPerson[]} data - Array of WantedPerson objects.
 * @returns {WantedPerson[]} Processed array of WantedPerson objects.
 */
const processWantedPersons = (data: WantedPerson[]): WantedPerson[] => {
  // if data is not an array, return it as an array
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

/**
 * Creates a new WantedPerson entry.
 *
 * @param {string} endpoint - The API endpoint.
 * @param {WantedPerson} data - The WantedPerson object to create.
 * @returns {Promise<WantedPerson>} A promise that resolves to the created WantedPerson object.
 */
const createData = (endpoint: string, data: WantedPerson): Promise<WantedPerson> =>
  fetchData<WantedPerson>(endpoint, "POST", data);

/**
 * Reads WantedPerson data from an endpoint.
 *
 * @param {string} endpoint - The API endpoint.
 * @returns {Promise<WantedPerson[]>} A promise that resolves to an array of WantedPerson objects.
 */
const readData = async (endpoint: string): Promise<WantedPerson[]> => {
  return await fetchData<WantedPerson[]>(endpoint);
};

/**
 * Updates an existing WantedPerson entry.
 *
 * @param {string} endpoint - The API endpoint.
 * @param {string} id - The ID of the WantedPerson to update.
 * @param {PersonDetails} data - The details to update.
 * @returns {Promise<WantedPerson>} A promise that resolves to the updated WantedPerson object.
 */
const updateData = (endpoint: string, id: string, data: PersonDetails): Promise<WantedPerson> =>
  fetchData<WantedPerson>(`${endpoint}/${id}`, "PUT", data);

/**
 * Deletes a WantedPerson entry.
 *
 * @param {string} endpoint - The API endpoint.
 * @param {string} id - The ID of the WantedPerson to delete.
 * @returns {Promise<void>} A promise that resolves when the deletion is complete.
 */
const deleteData = (endpoint: string, id: string): Promise<void> =>
  fetchData<void>(`${endpoint}/${id}`, "DELETE");

/**
 * Wanted person service for creating, reading, updating, and deleting wanted persons.
 */
export const wanted = {
  /**
   * Creates a new WantedPerson.
   *
   * @param {WantedPerson} data - The WantedPerson object to create.
   * @returns {Promise<WantedPerson>} A promise that resolves to the created WantedPerson object.
   */
  create: (data: WantedPerson) => createData("/default_all_pages", data),

  /**
   * Reads all WantedPerson data.
   *
   * @returns {Promise<WantedPerson[]>} A promise that resolves to an array of WantedPerson objects.
   */
  read: async (): Promise<WantedPerson[]> =>
    processWantedPersons(await readData("/default_all_pages")),

  /**
   * Updates an existing WantedPerson.
   *
   * @param {string} id - The ID of the WantedPerson to update.
   * @param {PersonDetails} data - The details to update.
   * @returns {Promise<WantedPerson>} A promise that resolves to the updated WantedPerson object.
   */
  update: (id: string, data: PersonDetails) => updateData("/default_all_pages", id, data),

  /**
   * Deletes a WantedPerson.
   *
   * @param {string} id - The ID of the WantedPerson to delete.
   * @returns {Promise<void>} A promise that resolves when the deletion is complete.
   */
  delete: (id: string) => deleteData("/default_all_pages", id),
};
