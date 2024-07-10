import { useState, useEffect } from "react";
import { fetchWantedPersonsByCategory } from "../services/fetchWantedPersonsByCategory";
const useFetchPersons = (subject) => {
    const [persons, setPersons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        try {
            fetchWantedPersonsByCategory(subject)
                .then((result) => {
                setPersons(result);
                setIsLoading(false);
            })
                .catch(error => {
                setError(error);
                setIsLoading(false);
            });
            setIsLoading(false);
        }
        catch (error) {
            setError(error);
            setIsLoading(false);
        }
    }, [subject]);
    return { persons, isLoading, error, setPersons };
};
export default useFetchPersons;
