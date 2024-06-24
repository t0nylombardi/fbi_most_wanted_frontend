import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Modal from "../../components/Modal";
import { WantedPerson } from "../../services/types";

describe("Modal", () => {
  const mockCloseModal = jest.fn();
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

  beforeEach(() => {
    mockCloseModal.mockClear();
  });

  test("renders modal correctly", () => {
    render(<Modal closeModal={mockCloseModal} person={mockPerson} />);
    const modalElement = screen.getByRole("dialog");
    expect(modalElement).toBeInTheDocument();
  });

  test("closes modal when clicking outside", () => {
    render(<Modal closeModal={mockCloseModal} person={mockPerson} />);

    // Simulate click outside the modal
    fireEvent.mouseDown(document.body);

    // Expect the closeModal function to be called
    expect(mockCloseModal).toHaveBeenCalled();
  });
});
