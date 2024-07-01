import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "../../pages/Home";
import { loadingMessages } from "../../services/constants";
import { wanted } from "../../services/endpoints";

// Mocking the wanted service methods
jest.mock("../../services/endpoints", () => ({
  wanted: {
    read: jest.fn(() => Promise.resolve([])), // Mocking initial empty state
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

const mockPersons = [
  {
    id: "1",
    title: "Person 1",
    modified: "2024-06-30T12:00:00Z",
    images: ["image1.jpg"],
    details: {
      age_range: "30-40",
      eyes: "blue",
      hair: "brown",
      height_max: 72,
      place_of_birth: "New York",
      race: "Caucasian",
      sex: "Male",
      weight_max: 180,
    },
  },
  {
    id: "2",
    title: "Person 2",
    modified: "2024-06-29T12:00:00Z",
    images: ["image2.jpg"],
    details: {
      age_range: "25-35",
      eyes: "green",
      hair: "blonde",
      height_max: 65,
      place_of_birth: "Chicago",
      race: "Hispanic",
      sex: "Female",
      weight_max: 140,
    },
  },
];

const queryClient = new QueryClient();

describe("Home Component", () => {
  beforeEach(() => {
    queryClient.clear();
    // Mock the fetchWantedPersons function
    (wanted.read as jest.Mock).mockResolvedValue(mockPersons);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear all mocks after each test
  });

  it("renders loading screen when loading", async () => {
    (wanted.read as jest.Mock).mockResolvedValue(mockPersons);
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>,
    );

    const loadingMessageElement = screen.getByTestId("loading-message");

    // Get the initial loading message
    const initialMessage = loadingMessageElement.textContent;
    console.log("initialMessage: ", initialMessage);

    expect(loadingMessages).toContain(initialMessage);

    // Wait for data to load
    await waitFor(() => expect(wanted.read).toHaveBeenCalledTimes(1));
  });

  it("renders error message when fetch fails", async () => {
    const errorMessage = "Failed to fetch wanted persons";
    (wanted.read as jest.Mock).mockResolvedValue(new Error(errorMessage));

    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>,
    );
    // await 5 seconds for the error message to appear
    await waitFor(() => expect(screen.getByText(errorMessage)).toBeInTheDocument());
  });

  it("updates person details and closes modal", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>,
    );

    // Wait for data to load
    await waitFor(() => expect(wanted.read).toHaveBeenCalledTimes(1));

    // Open modal for the first person
    fireEvent.click(screen.getByTestId("loading-message"));

    // Update details in modal
    fireEvent.change(screen.getByTestId("age_range"), { target: { value: "20-30" } });
    fireEvent.click(screen.getByText("Submit"));

    // Wait for update to complete
    await waitFor(() => expect(wanted.update).toHaveBeenCalledTimes(1));

    // Verify that modal is closed
    expect(screen.queryByText("Close Modal")).not.toBeInTheDocument();
  });

  it.skip("removes a person and updates the list", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>,
    );

    // Wait for data to load
    await waitFor(() => expect(wanted.read).toHaveBeenCalledTimes(1));

    // Open modal for the first person
    fireEvent.click(screen.getByText(mockPersons[0].title));

    // Remove person
    fireEvent.click(screen.getByText("Remove"));

    // Wait for remove to complete
    await waitFor(() => expect(wanted.delete).toHaveBeenCalledTimes(1));

    // Verify that modal is closed and person is removed from the list
    expect(screen.queryByText("Close Modal")).not.toBeInTheDocument();
    expect(screen.queryByText(mockPersons[0].title)).not.toBeInTheDocument();
  });
});
