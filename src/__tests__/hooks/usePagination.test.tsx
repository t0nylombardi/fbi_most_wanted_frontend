import { renderHook, act } from "@testing-library/react";
import usePagination from "../../hooks/usePagination";
import { WantedPerson } from "../../services/types";
import { ITEMS_PER_PAGE } from "../../services/constants";
import mockPersons from "../../__mocks__/mockPersons";

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

    act(() => {
      result.current.handleNextPage();
    });

    act(() => {
      result.current.handlePrevPage();
    });

    expect(result.current.currentPage).toBe(1);
    expect(result.current.startIndex).toBe(0);
    expect(result.current.currentPersons).toEqual(persons.slice(0, ITEMS_PER_PAGE));
  });

  it("does not go below page 1", () => {
    const { result } = renderHook(() => usePagination(persons));

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
