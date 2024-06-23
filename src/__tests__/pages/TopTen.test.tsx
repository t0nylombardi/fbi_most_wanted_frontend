import React from "react";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import TopTen from "../../pages/TopTen";
import { tenMostWanted } from "../../services/endpoints";
import { WantedPerson } from "../../services/types";

// Mock the tenMostWanted.read function
jest.mock("../../services/endpoints", () => ({
  tenMostWanted: {
    read: jest.fn(),
  },
}));

const mockPersons: WantedPerson[] = [
  {
    id: "1",
    details: "Details of John Doe",
    height_min: 170,
    url: "url",
    weight_min: 70,
    title: "John Doe",
    description: "Description of Wanted Person",
    images: [
      {
        large: "https://via.placeholder.com/150",
        caption: "Person 1",
      },
    ],
    age_range: "25-30",
    eyes: "Blue",
    hair: "Blonde",
    height_max: 180,
    place_of_birth: "New York",
    race: "Caucasian",
    sex: "Male",
    weight_max: 75,
  },
  {
    id: "2",
    details: "Details of Jane Doe",
    height_min: 70,
    url: "url",
    weight_min: 45,
    title: "John Doe",
    description: "Description of Wanted Person",
    images: [
      {
        large: "https://via.placeholder.com/110",
        caption: "Person 2",
      },
    ],
    age_range: "25-30",
    eyes: "Blue",
    hair: "Blonde",
    height_max: 180,
    place_of_birth: "New York",
    race: "Caucasian",
    sex: "Male",
    weight_max: 75,
  },
];

describe("TopTen Component", () => {
  afterEach(cleanup);

  test("displays loading state initially", async () => {
    (tenMostWanted.read as jest.Mock).mockResolvedValueOnce([]);
    render(<TopTen />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });
  });

  test("displays error state when fetching fails", async () => {
    const errorMessage = "Failed to fetch data";
    (tenMostWanted.read as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));
    render(<TopTen />);
    await waitFor(() => expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument());
  });

  test("displays list of persons when fetching succeeds", async () => {
    (tenMostWanted.read as jest.Mock).mockResolvedValueOnce(mockPersons);
    render(<TopTen />);
    await waitFor(() => {
      expect(screen.getByText("Top Ten Most Wanted")).toBeInTheDocument();
      mockPersons.forEach(person => {
        const caption = person.images[0].caption;
        if (caption) {
          expect(screen.getByAltText(caption)).toBeInTheDocument();
        }
      });
    });
  });
});
