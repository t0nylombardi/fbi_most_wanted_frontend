import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import mockPersons from "../../__mocks__/mockPersons";
import CategoryPage from "../../pages/CategoryPage";
import { WantedPerson } from "../../services/types";
import * as useFetchPersonsHook from "../../hooks/useFetchPersons";
import * as usePaginationHook from "../../hooks/usePagination";

jest.mock("../../components/PageWrapper", () => ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
));
jest.mock("../../components/LoadingScreen", () => () => <div>Loading...</div>);

interface PaginationControlsProps {
  handlePrevPage: () => void;
  handleNextPage: () => void;
  currentPage: number;
  startIndex: number;
  itemsPerPage: number;
  personsLength: number;
}

jest.mock("../../components/PaginationControls", () => (props: PaginationControlsProps) => (
  <div>
    <button onClick={props.handlePrevPage}>Previous</button>
    <button onClick={props.handleNextPage}>Next</button>
  </div>
));

interface ImageCardListProps {
  persons: WantedPerson[];
  openModal: (person: WantedPerson) => void;
}

jest.mock("../../components/ImageCardList", () => ({ persons, openModal }: ImageCardListProps) => (
  <div>
    {persons.map((person, index) => (
      <div key={index} data-testid="person" onClick={() => openModal(person)}>
        {person.title}
      </div>
    ))}
  </div>
));

jest.mock("../../components/PageTitle", () => ({ category }: { category: string }) => (
  <div>{category}</div>
));
jest.mock("../../components/ModalManager", () => () => <div>ModalManager</div>);

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

    render(<CategoryPage category={category} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error message when error occurs", () => {
    mockUseFetchPersons.mockReturnValueOnce({
      persons: [],
      isLoading: false,
      error: { name: "Error", message: "Error fetching data" },
      setPersons: jest.fn(),
    });

    render(<CategoryPage category={category} />);
    expect(screen.getByText("Error: Error fetching data")).toBeInTheDocument();
  });

  it("renders category page with persons", () => {
    render(<CategoryPage category={category} />);
    expect(screen.getByText(category)).toBeInTheDocument();
    expect(screen.getAllByTestId("person")).toHaveLength(mockPersons.length);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("handles pagination controls", () => {
    const { handleNextPage, handlePrevPage } = usePaginationHook.default(mockPersons);

    render(<CategoryPage category={category} />);
    fireEvent.click(screen.getByText("Next"));
    expect(handleNextPage).toHaveBeenCalled();

    fireEvent.click(screen.getByText("Previous"));
    expect(handlePrevPage).toHaveBeenCalled();
  });

  it("opens modal on person click", async () => {
    render(<CategoryPage category={category} />);
    fireEvent.click(screen.getByText("John Doe"));
    await waitFor(() => expect(screen.getByText("ModalManager")).toBeInTheDocument());
  });
});
