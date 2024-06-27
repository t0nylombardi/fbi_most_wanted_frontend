import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Modal from "../../components/Modal";
import { WantedPerson } from "../../services/types";

// Mock data
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
  subjects: ["John", "Doe"],
};

const closeModalMock = jest.fn();
const editWantedPersonMock = jest.fn();
const removeWantedPersonMock = jest.fn();

describe("Modal Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders SinglePersonCard when not editing", () => {
    render(
      <Modal
        closeModal={closeModalMock}
        person={mockPerson}
        isEditing={false}
        editWantedPerson={editWantedPersonMock}
        removeWantedPerson={removeWantedPersonMock}
      />,
    );

    expect(screen.getByText(mockPerson.title || "")).toBeInTheDocument();
    expect(screen.getByText(mockPerson.description || "")).toBeInTheDocument();
  });

  test("renders Form when editing", () => {
    render(
      <Modal
        closeModal={closeModalMock}
        person={mockPerson}
        isEditing={true}
        editWantedPerson={editWantedPersonMock}
        removeWantedPerson={removeWantedPersonMock}
      />,
    );

    // Assuming Form component has an input field for the person's name
    expect(screen.getByTestId("age_range")).toBeInTheDocument();
  });

  test("calls closeModal when clicking outside the modal", () => {
    render(
      <Modal
        closeModal={closeModalMock}
        person={mockPerson}
        isEditing={false}
        editWantedPerson={editWantedPersonMock}
        removeWantedPerson={removeWantedPersonMock}
      />,
    );

    fireEvent.mouseDown(document);

    expect(closeModalMock).toHaveBeenCalled();
  });

  test("does not call closeModal when clicking inside the modal", () => {
    render(
      <Modal
        closeModal={closeModalMock}
        person={mockPerson}
        isEditing={false}
        editWantedPerson={editWantedPersonMock}
        removeWantedPerson={removeWantedPersonMock}
      />,
    );

    const modalElement = screen.getByRole("dialog");

    fireEvent.mouseDown(modalElement);

    expect(closeModalMock).not.toHaveBeenCalled();
  });

  test("calls editWantedPerson when edit button is clicked in SinglePersonCard", () => {
    render(
      <Modal
        closeModal={closeModalMock}
        person={mockPerson}
        isEditing={false}
        editWantedPerson={editWantedPersonMock}
        removeWantedPerson={removeWantedPersonMock}
      />,
    );

    // Assuming SinglePersonCard has an edit button with text "Edit"
    fireEvent.click(screen.getByText(/edit/i));

    expect(editWantedPersonMock).toHaveBeenCalledWith(mockPerson.id);
  });

  test("calls removeWantedPerson when remove button is clicked in SinglePersonCard", () => {
    render(
      <Modal
        closeModal={closeModalMock}
        person={mockPerson}
        isEditing={false}
        editWantedPerson={editWantedPersonMock}
        removeWantedPerson={removeWantedPersonMock}
      />,
    );

    // Assuming SinglePersonCard has a remove button with text "Remove"
    fireEvent.click(screen.getByText(/remove/i));

    expect(removeWantedPersonMock).toHaveBeenCalled();
  });
});
