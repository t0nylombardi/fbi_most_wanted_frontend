import { useState, useMemo, useCallback } from "react";
import { ITEMS_PER_PAGE } from "../services/constants";
const usePagination = (persons) => {
    const [currentPage, setCurrentPage] = useState(1);
    const handleNextPage = useCallback(() => {
        setCurrentPage(prevPage => prevPage + 1);
    }, []);
    const handlePrevPage = useCallback(() => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    }, []);
    const startIndex = useMemo(() => (currentPage - 1) * ITEMS_PER_PAGE, [currentPage]);
    const currentPersons = useMemo(() => persons.slice(startIndex, startIndex + ITEMS_PER_PAGE), [persons, startIndex]);
    return { currentPage, handleNextPage, handlePrevPage, startIndex, currentPersons };
};
export default usePagination;
