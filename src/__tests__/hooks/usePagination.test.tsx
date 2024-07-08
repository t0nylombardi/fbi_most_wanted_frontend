import { renderHook, act } from "@testing-library/react";
import usePagination from "../../hooks/usePagination";
import { WantedPerson } from "../../services/types";
import { ITEMS_PER_PAGE } from "../../services/constants";
import mockPersons from "../../__mocks__/mockPersons"; // Adjust the path to your mock data

describe("usePagination", () => {
  const persons: WantedPerson[] = mockPersons;

  it("initializes with the first page", () => {
    const { result } = renderHook(() => usePagination(persons));
    expect(result.current.currentPage).toBe(1);
    expect(result.current.startIndex).toBe(0);
    expect(result.current.currentPersons).toEqual(persons.slice(0, ITEMS_PER_PAGE));
  });

  it("handles next page correctly", () => {
    const { result } = renderHook(() => usePagination(persons));

    act(() => {
      result.current.handleNextPage();
    });

    expect(result.current.currentPage).toBe(2);
    expect(result.current.startIndex).toBe(ITEMS_PER_PAGE);
    expect(result.current.currentPersons).toEqual(
      persons.slice(ITEMS_PER_PAGE, ITEMS_PER_PAGE * 2),
    );
  });

  it("handles previous page correctly", () => {
    const { result } = renderHook(() => usePagination(persons));

    // Move to page 2 first
    act(() => {
      result.current.handleNextPage();
    });

    // Then move back to page 1
    act(() => {
      result.current.handlePrevPage();
    });

    expect(result.current.currentPage).toBe(1);
    expect(result.current.startIndex).toBe(0);
    expect(result.current.currentPersons).toEqual(persons.slice(0, ITEMS_PER_PAGE));
  });

  it("does not go below page 1", () => {
    const { result } = renderHook(() => usePagination(persons));

    // Try moving to a previous page when on the first page
    act(() => {
      result.current.handlePrevPage();
    });

    expect(result.current.currentPage).toBe(1);
    expect(result.current.startIndex).toBe(0);
    expect(result.current.currentPersons).toEqual(persons.slice(0, ITEMS_PER_PAGE));
  });

  it("handles edge case of empty persons list", () => {
    const { result } = renderHook(() => usePagination([]));

    expect(result.current.currentPage).toBe(1);
    expect(result.current.startIndex).toBe(0);
    expect(result.current.currentPersons).toEqual([]);
  });
});
