// src/components/Modal.test.tsx

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Modal from "../../components/Modal";
import { WantedPerson } from "../../services/types";

type SinglePersonCardProps = {
  person: WantedPerson;
  closeModal: () => void;
  removeWantedPerson: () => void;
};

// Mock the SinglePersonCard component
jest.mock(
  "../../components/SinglePersonCard",
  () =>
    ({ person, closeModal, removeWantedPerson }: SinglePersonCardProps) =>
      (
        <div data-testid="single-person-card">
          <button onClick={closeModal}>Close</button>
          <button onClick={removeWantedPerson}>Remove</button>
        </div>
      ),
);

const mockPerson: WantedPerson = {
  id: "1",
  title: "John Doe",
  details: "Details of John Doe",
  height_min: 170,
  weight_min: 70,
  url: "url",
  description: "Description of John Doe",
  images: [{ large: "image-url-1", caption: "John Doe" }],
  age_range: "25-30",
  eyes: "Blue",
  hair: "Blonde",
  height_max: 180,
  place_of_birth: "New York",
  race: "Caucasian",
  sex: "Male",
  weight_max: 75,
};

describe("Modal", () => {
  let closeModal: jest.Mock;
  let removeWantedPerson: jest.Mock;

  beforeEach(() => {
    closeModal = jest.fn();
    removeWantedPerson = jest.fn();
  });

  test("renders the modal with SinglePersonCard", () => {
    render(
      <Modal closeModal={closeModal} person={mockPerson} removeWantedPerson={removeWantedPerson} />,
    );
    expect(screen.getByTestId("single-person-card")).toBeInTheDocument();
  });

  test("calls closeModal when clicking outside the modal", () => {
    render(
      <Modal closeModal={closeModal} person={mockPerson} removeWantedPerson={removeWantedPerson} />,
    );
    fireEvent.mouseDown(document);
    expect(closeModal).toHaveBeenCalled();
  });

  test("does not call closeModal when clicking inside the modal", () => {
    render(
      <Modal closeModal={closeModal} person={mockPerson} removeWantedPerson={removeWantedPerson} />,
    );
    fireEvent.mouseDown(screen.getByTestId("single-person-card"));
    expect(closeModal).not.toHaveBeenCalled();
  });

  test("calls closeModal when clicking the close button", () => {
    render(
      <Modal closeModal={closeModal} person={mockPerson} removeWantedPerson={removeWantedPerson} />,
    );
    fireEvent.click(screen.getByText("Close"));
    expect(closeModal).toHaveBeenCalled();
  });

  test("calls removeWantedPerson when clicking the remove button", () => {
    render(
      <Modal closeModal={closeModal} person={mockPerson} removeWantedPerson={removeWantedPerson} />,
    );
    fireEvent.click(screen.getByText("Remove"));
    expect(removeWantedPerson).toHaveBeenCalled();
  });
});
