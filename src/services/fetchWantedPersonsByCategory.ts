import { wanted } from "./fetchWantedPersonsService";
import { WantedPerson } from "./types";

/**
 * Fetch wanted persons based on category
 *
 * @param {string} category - The category to filter by
 * @returns {Promise<WantedPerson[]>} A promise that resolves to an array of wanted persons
 */
export const fetchWantedPersonsByCategory = async (
  category: string = "",
): Promise<WantedPerson[]> => {
  const filterObj: { [key: string]: string } = {
    "cyber-crimes": "Cyber's Most Wanted",
    "missing-persons": "ViCAP Missing Persons",
    "violent-crimes": "Violent Crime - Murders",
  };

  try {
    const result = await wanted.read();
    result.sort((a, b) => {
      const dateA = new Date(String(a.modified)).getTime();
      const dateB = new Date(String(b.modified)).getTime();
      return dateA - dateB;
    });

    if (category === "wanted") return result;

    return result.filter(person => person.subjects.includes(filterObj[category]));
  } catch (error) {
    throw new Error("Failed to fetch wanted persons");
  }
};
