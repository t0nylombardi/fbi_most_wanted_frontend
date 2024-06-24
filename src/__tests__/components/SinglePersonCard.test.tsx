// src/components/SinglePersonCard.test.tsx

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SinglePersonCard from "../../components/SinglePersonCard";
import { WantedPerson } from "../../services/types";

// Mock the ImageCard component
jest.mock(
  "../../components/ImageCard",
  () =>
    ({ image, caption }: { image: { large: string; caption: string }; caption: boolean }) =>
      <div data-testid="image-card">{caption && <p>{image.caption}</p>}</div>,
);

// Mock the WantedPersonDetails component
jest.mock("../../components/WantedPersonDetails", () => ({ person }: { person: WantedPerson }) => (
  <div data-testid="wanted-person-details">{person.title}</div>
));

// Mock the PersonDescription component
jest.mock(
  "../../components/PersonDescription",
  () =>
    ({ description, details }: { description: string | null; details: string | null }) =>
      <div data-testid="person-description">{description || details}</div>,
);

// Mock the Button component
jest.mock(
  "../../components/Button",
  () =>
    ({ text, onClick }: { text: string; onClick: () => void }) =>
      (
        <button data-testid={text} onClick={onClick}>
          {text}
        </button>
      ),
);

const mockPerson: WantedPerson = {
  id: "1",
  title: "John Doe",
  details: "Details of Wanted Person",
  height_min: 170,
  weight_min: 70,
  url: "url",
  description: "Description of a Wanted Person",
  images: [{ large: "image-url-1", caption: "This is a caption" }],
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
  let closeModal: jest.Mock;
  let removeWantedPerson: jest.Mock;

  beforeEach(() => {
    closeModal = jest.fn();
    removeWantedPerson = jest.fn();
  });

  test("renders the SinglePersonCard with provided person data", () => {
    render(<SinglePersonCard person={mockPerson} />);
    expect(screen.queryAllByText(mockPerson.title?.toString() || "")[0]).toBeInTheDocument();
    expect(screen.getByTestId("image-card")).toBeInTheDocument();
    expect(screen.getByTestId("wanted-person-details")).toBeInTheDocument();
    expect(screen.getByTestId("person-description")).toBeInTheDocument();
  });

  test("renders the close button when showCloseModal is true", () => {
    render(<SinglePersonCard person={mockPerson} showCloseModal={true} closeModal={closeModal} />);
    expect(screen.getByText("×")).toBeInTheDocument();
  });

  test("calls closeModal when the close button is clicked", () => {
    render(<SinglePersonCard person={mockPerson} showCloseModal={true} closeModal={closeModal} />);
    fireEvent.click(screen.getByText("×"));
    expect(closeModal).toHaveBeenCalled();
  });

  test("calls removeWantedPerson when the remove button is clicked", () => {
    render(<SinglePersonCard person={mockPerson} removeWantedPerson={removeWantedPerson} />);
    fireEvent.click(screen.getByTestId("remove"));
    expect(removeWantedPerson).toHaveBeenCalledWith(mockPerson.id);
  });

  test("does not call removeWantedPerson when the remove button is clicked and removeWantedPerson is not provided", () => {
    render(<SinglePersonCard person={mockPerson} />);
    fireEvent.click(screen.getByTestId("remove"));
    expect(removeWantedPerson).not.toHaveBeenCalled();
  });
});
