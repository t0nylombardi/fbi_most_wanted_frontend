import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import mockPersons from "../../__mocks__/mockPersons";
import CategoryPage from "../../pages/CategoryPage";
import * as useFetchPersonsHook from "../../hooks/useFetchPersons";
import * as usePaginationHook from "../../hooks/usePagination";
jest.mock("../../components/PageWrapper", () => ({ children }) => (_jsx("div", { children: children })));
jest.mock("../../components/LoadingScreen", () => () => _jsx("div", { children: "Loading..." }));
jest.mock("../../components/PaginationControls", () => (props) => (_jsxs("div", { children: [_jsx("button", { onClick: props.handlePrevPage, children: "Previous" }), _jsx("button", { onClick: props.handleNextPage, children: "Next" })] })));
jest.mock("../../components/ImageCardList", () => ({ persons, openModal }) => (_jsx("div", { children: persons.map((person, index) => (_jsx("div", { "data-testid": "person", onClick: () => openModal(person), children: person.title }, index))) })));
jest.mock("../../components/PageTitle", () => ({ category }) => (_jsx("div", { children: category })));
jest.mock("../../components/ModalManager", () => () => _jsx("div", { children: "ModalManager" }));
const mockUseFetchPersons = jest.spyOn(useFetchPersonsHook, "default");
const mockUsePagination = jest.spyOn(usePaginationHook, "default");
const categories = ["wanted", "cyberCrimes", "missingPersons", "violentCrimes"];
describe.each(categories)("CategoryPage - %s", category => {
    beforeEach(() => {
        mockUseFetchPersons.mockReturnValue({
            persons: mockPersons,
            isLoading: false,
            error: null,
            setPersons: jest.fn(),
        });
        mockUsePagination.mockReturnValue({
            currentPage: 1,
            handleNextPage: jest.fn(),
            handlePrevPage: jest.fn(),
            startIndex: 0,
            currentPersons: mockPersons,
        });
    });
    it("renders loading screen when loading", () => {
        mockUseFetchPersons.mockReturnValueOnce({
            persons: [],
            isLoading: true,
            error: null,
            setPersons: jest.fn(),
        });
        render(_jsx(CategoryPage, { category: category }));
        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });
    it("renders error message when error occurs", () => {
        mockUseFetchPersons.mockReturnValueOnce({
            persons: [],
            isLoading: false,
            error: { name: "Error", message: "Error fetching data" },
            setPersons: jest.fn(),
        });
        render(_jsx(CategoryPage, { category: category }));
        expect(screen.getByText("Error: Error fetching data")).toBeInTheDocument();
    });
    it("renders category page with persons", () => {
        render(_jsx(CategoryPage, { category: category }));
        expect(screen.getByText(category)).toBeInTheDocument();
        expect(screen.getAllByTestId("person")).toHaveLength(mockPersons.length);
        expect(screen.getByText("John Doe")).toBeInTheDocument();
    });
    it("handles pagination controls", () => {
        const { handleNextPage, handlePrevPage } = usePaginationHook.default(mockPersons);
        render(_jsx(CategoryPage, { category: category }));
        fireEvent.click(screen.getByText("Next"));
        expect(handleNextPage).toHaveBeenCalled();
        fireEvent.click(screen.getByText("Previous"));
        expect(handlePrevPage).toHaveBeenCalled();
    });
    it("opens modal on person click", async () => {
        render(_jsx(CategoryPage, { category: category }));
        fireEvent.click(screen.getByText("John Doe"));
        await waitFor(() => expect(screen.getByText("ModalManager")).toBeInTheDocument());
    });
});
