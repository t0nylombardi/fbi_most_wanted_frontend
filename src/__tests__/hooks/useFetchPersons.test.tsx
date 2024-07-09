import react, { Dispatch, SetStateAction } from "react";
import { renderHook, RenderHookResult, act } from "@testing-library/react";
import { waitFor } from "@testing-library/react";
import useFetchPersons from "../../hooks/useFetchPersons";
import { WantedPerson } from "../../services/types";
import { fetchWantedPersonsByCategory } from "../../services/fetchWantedPersonsByCategory";
import mockPersons from "../../__mocks__/mockPersons";

jest.mock("../../services/fetchWantedPersonsByCategory");

describe("useFetchPersons", () => {
  it("fetches persons successfully", async () => {
    (fetchWantedPersonsByCategory as jest.Mock).mockResolvedValueOnce(mockPersons);

    let hook: RenderHookResult<any, any>;
    await act(async () => {
      hook = renderHook(() => useFetchPersons("cyber-crime"));
    });

    const { result } = hook!;

    waitFor(
      () => {
        expect(result.current.isLoading).toBe(true);
        expect(result.current.error).toBeNull();
        expect(result.current.persons).toEqual([]);
      },
      { interval: 1000, timeout: 5000 },
    );

    await act(async () => {
      await waitFor(() => !result.current.isLoading);
    });

    expect(result.current.error).toBeNull();
    expect(result.current.persons).toEqual(mockPersons);
  });

  it("handles error during fetch", async () => {
    const mockError = new Error("Failed to fetch");
    (fetchWantedPersonsByCategory as jest.Mock).mockRejectedValue(mockError);

    const { result } = await renderHook(() => useFetchPersons("someCategory"));

    waitFor(
      () => {
        expect(result.current.isLoading).toBe(true);
        expect(result.current.error).toBeNull();
        expect(result.current.persons).toEqual([]);
      },
      { interval: 1000, timeout: 5000 },
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toEqual(mockError);
    expect(result.current.persons).toEqual([]);
  });
});
