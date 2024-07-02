import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import Home from "../../pages/Home";
import { loadingMessages } from "../../services/constants";
import { wanted } from "../../services/endpoints";
import mockPersons from "../../__mocks__/mockPersons";

jest.mock("../../services/endpoints", () => ({
  wanted: {
    read: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

describe("Home Component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  test("renders loading screen while fetching data", async () => {
    (wanted.read as jest.Mock).mockResolvedValueOnce(mockPersons);

    await act(async () => {
      render(<Home />);
    });

    // Check if the loading screen is rendered initially
    let loadingMessageElement;
    await waitFor(() => {
      loadingMessageElement = screen.getByTestId("loading-message");
      expect(loadingMessageElement).toBeInTheDocument();
    });

    // Advance timers by 8 seconds
    await act(async () => {
      jest.advanceTimersByTime(8000);
    });

    // Wait for the data to be fetched and the list to be rendered
    await act(() => {
      expect(wanted.read).toHaveBeenCalledTimes(1);
      expect(screen.getAllByTestId("image-card")).toHaveLength(mockPersons.length);
    });

    // Ensure loading message is no longer in the document
    expect(screen.queryByTestId("loading-message")).not.toBeInTheDocument();
  });

  test("renders error message if fetch fails", async () => {
    (wanted.read as jest.Mock).mockRejectedValueOnce(
      new Error("Error: Failed to fetch wanted persons"),
    );

    render(<Home />);

    const loadingMessageElement = screen.getByTestId("loading-message");

    // Get the initial loading message
    const initialMessage = loadingMessageElement.textContent;
    expect(loadingMessages).toContain(initialMessage);

    // Wait for error message to appear
    await waitFor(
      () => {
        expect(screen.getByText("Error: Failed to fetch wanted persons")).toBeInTheDocument();
      },
      { timeout: 5000 }, // Adjust timeout as necessary
    );

    expect(screen.queryByTestId("image-card")).not.toBeInTheDocument();
  });

  test("renders list of wanted persons after successful fetch", async () => {
    (wanted.read as jest.Mock).mockResolvedValueOnce(mockPersons);

    await act(async () => {
      render(<Home />);
    });

    // Advance timers by 8 seconds
    await act(async () => {
      jest.advanceTimersByTime(8000);
    });

    // Wait for data to be fetched and components to be rendered
    await waitFor(() => {
      expect(wanted.read).toHaveBeenCalledTimes(1);
      expect(screen.getAllByTestId("image-card")).toHaveLength(mockPersons.length);
    });
  });
});
