import { fetchData } from "./api";
const createData = async (endpoint, data) => {
    const response = await fetchData(endpoint, "POST", data);
    return response.data;
};
export const processWantedPersons = (data) => {
    if (!data)
        return [];
    if (!Array.isArray(data))
        return [data];
    return data.map((item) => ({
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
const readData = async (endpoint) => {
    const response = await fetchData(endpoint);
    return response.data;
};
const updateData = async (endpoint, id, data) => {
    try {
        const response = await fetchData(`${endpoint}/${id}`, "PUT", data);
        return response.data;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(`Error updating data at ${endpoint}/${id}:`, error.message);
        }
        else {
            console.error(`Unexpected error updating data at ${endpoint}/${id}:`, error);
        }
        return null;
    }
};
const deleteData = async (endpoint, id) => {
    await fetchData(`${endpoint}/${id}`, "DELETE");
};
export const wanted = {
    create: (data) => createData("/default_all_pages", data),
    read: async () => processWantedPersons(await readData("/default_all_pages")),
    update: (id, data) => updateData("/default_all_pages", id, data),
    delete: (id) => deleteData("/default_all_pages", id),
};
