import { wanted } from "./wantedPerson";
import { WantedPerson } from "./types";

export const fetchWantedPersons = async (subject: string = ""): Promise<WantedPerson[]> => {
  console.log("subject", subject);
  const filterObj: { [key: string]: string } = {
    cyber: "Cyber's Most Wanted",
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

    if (!subject) return result;

    return result.filter(person => person.subjects.includes(filterObj[subject]));
  } catch (error) {
    throw new Error("Failed to fetch wanted persons");
  }
};
