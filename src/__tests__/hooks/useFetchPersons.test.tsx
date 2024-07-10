import { renderHook, act } from "@testing-library/react";
import { waitFor } from "@testing-library/react";
import useFetchPersons from "../../hooks/useFetchPersons";
import { fetchWantedPersonsByCategory } from "../../services/fetchWantedPersonsByCategory";
import mockPersons from "../../__mocks__/mockPersons";

jest.mock("../../services/fetchWantedPersonsByCategory");

describe("useFetchPersons", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("fetches persons successfully", async () => {
    (fetchWantedPersonsByCategory as jest.Mock).mockResolvedValueOnce(mockPersons);

    const { result } = renderHook(() => useFetchPersons("cyber-crime"));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeNull();
    expect(result.current.persons).toEqual([]);

    // Advance timers by 8 seconds
    act(() => {
      jest.advanceTimersByTime(8000);
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(result.current.persons).toEqual(mockPersons);
    });
  });

  it("handles fetch error", async () => {
    const error = new Error("Failed to fetch");
    (fetchWantedPersonsByCategory as jest.Mock).mockRejectedValueOnce(error);

    const { result } = renderHook(() => useFetchPersons("cyber-crime"));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeNull();
    expect(result.current.persons).toEqual([]);

    // Advance timers by 8 seconds
    act(() => {
      jest.advanceTimersByTime(8000);
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe(error);
      expect(result.current.persons).toEqual([]);
    });
  });
});
