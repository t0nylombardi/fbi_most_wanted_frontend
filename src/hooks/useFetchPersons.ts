import { useState, useEffect } from "react";
import { WantedPerson } from "../services/types";
import { fetchWantedPersonsByCategory } from "../services/fetchWantedPersonsByCategory";

const useFetchPersons = (subject: string) => {
  const [persons, setPersons] = useState<WantedPerson[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      fetchWantedPersonsByCategory(subject)
        .then((result: WantedPerson[]) => {
          setPersons(result);
          setIsLoading(false);
        })
        .catch(error => {
          setError(error as Error);
          setIsLoading(false);
        });
      setIsLoading(false);
    } catch (error) {
      setError(error as Error);
      setIsLoading(false);
    }
  }, [subject]);

  return { persons, isLoading, error, setPersons };
};

export default useFetchPersons;
