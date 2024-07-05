import { useState, useEffect } from "react";
import { WantedPerson } from "../services/types";
import { fetchWantedPersonsByCategory } from "../services/fetchWantedPersonsByCategory";

const useFetchPersons = (subject: string) => {
  const [persons, setPersons] = useState<WantedPerson[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetchWantedPersonsByCategory(subject)
      .then((result: WantedPerson[]) => {
        setPersons(result);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  }, [subject]);

  return { persons, isLoading, error, setPersons };
};

export default useFetchPersons;
