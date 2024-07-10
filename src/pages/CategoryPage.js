import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { PageWrapper, LoadingScreen, PaginationControls, ImageCardList, PageTitle, ModalManager, } from "../components";
import useFetchPersons from "../hooks/useFetchPersons";
import usePagination from "../hooks/usePagination";
import { ITEMS_PER_PAGE } from "../services/constants";
const CategoryPage = ({ category }) => {
    const { persons, isLoading, error, setPersons } = useFetchPersons(category);
    const { currentPage, handleNextPage, handlePrevPage, startIndex, currentPersons } = usePagination(persons);
    const [activePerson, setActivePerson] = useState(null);
    const openModal = (person) => {
        setActivePerson(person);
    };
    if (isLoading)
        return _jsx(LoadingScreen, {});
    if (error)
        return _jsx("div", { children: `Error: ${error.message}` });
    return (_jsxs(PageWrapper, { children: [_jsxs("div", { className: "flex flex-row-reverse items-center justify-between px-[3rem]", children: [_jsx(PaginationControls, { handlePrevPage: handlePrevPage, currentPage: currentPage, handleNextPage: handleNextPage, startIndex: startIndex, itemsPerPage: ITEMS_PER_PAGE, personsLength: persons.length }), _jsx(PageTitle, { category: category })] }), _jsx(ImageCardList, { persons: currentPersons, openModal: openModal }), _jsx(ModalManager, { persons: persons, activePerson: activePerson, setActivePerson: setActivePerson, setPersons: setPersons })] }));
};
export default CategoryPage;
