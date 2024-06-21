// src/components/SinglePersonCard.test.tsx

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SinglePersonCard from "../../components/SinglePersonCard";
import { WantedPerson } from "../../services/types";

const mockPerson: WantedPerson = {
  id: "1",
  details: "Details of John Doe",
  height_min: 170,
  url: "url",
  weight_min: 70,
  title: "John Doe",
  description: "Description of Wanted Person",
  images: [
    {
      large: "image-url",
      caption: "John Doe",
      thumb: "image-url",
      original: "image-url",
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
};

describe("SinglePersonCard", () => {
  test("renders person title", () => {
    render(<SinglePersonCard person={mockPerson} />);
    expect(screen.getAllByText("John Doe")[0]).toBeInTheDocument();
  });

  test.skip("renders person description", () => {
    render(<SinglePersonCard person={mockPerson} />);
    expect(screen.getByText("Description of Wanted Person")).toBeInTheDocument();
  });

  test("renders image card", () => {
    render(<SinglePersonCard person={mockPerson} />);
    expect(screen.getByAltText("card-image")).toBeInTheDocument();
  });

  test("renders person details", () => {
    render(<SinglePersonCard person={mockPerson} />);
    expect(screen.getByText("Age range")).toBeInTheDocument();
    expect(screen.getByText("25-30")).toBeInTheDocument();
    expect(screen.getByText("Eyes")).toBeInTheDocument();
    expect(screen.getByText("Blue")).toBeInTheDocument();
  });

  test('renders "n/a" for missing details', () => {
    const personWithMissingDetails = {
      ...mockPerson,
      age_range: "1-99",
      eyes: "",
      hair: "",
      height_max: null,
      place_of_birth: "",
      race: "",
      sex: "",
      weight_max: null,
    };

    render(<SinglePersonCard person={personWithMissingDetails} />);
    expect(screen.getAllByText("n/a")).toHaveLength(5);
  });
});
