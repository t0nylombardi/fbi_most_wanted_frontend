import React from "react";
import "@testing-library/jest-dom";
import { WantedPerson } from "../../services/types";
import { render, fireEvent } from "@testing-library/react";
import Modal from "../../components/Modal";

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

const mockUpdatePersonDetails = jest.fn();
const mockEditPersonDetails = jest.fn();
const mockRemoveWantedPerson = jest.fn();
const mockCloseModal = jest.fn();

const defaultProps = {
  closeModal: mockCloseModal,
  person: mockPerson,
  isEditing: false,
  editPersonDetails: mockEditPersonDetails,
  updatePersonDetails: mockUpdatePersonDetails,
  removeWantedPerson: mockRemoveWantedPerson,
};

describe("Modal Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders SinglePersonCard when isEditing is false", () => {
    const { getByText } = render(<Modal {...defaultProps} />);

    // Assuming there's a text in SinglePersonCard
    expect(getByText(mockPerson.title)).toBeInTheDocument();
  });

  it("renders Form when isEditing is true", () => {
    const { getByText } = render(<Modal {...defaultProps} isEditing={true} />);

    expect(getByText("Submit")).toBeInTheDocument();
  });

  it("calls closeModal when clicking outside the modal", () => {
    render(<Modal {...defaultProps} />);

    fireEvent.mouseDown(document.body); // Simulate click outside modal

    expect(mockCloseModal).toHaveBeenCalledTimes(1);
  });

  it("calls updatePersonDetails when submitting the Form", () => {
    const { getByText } = render(<Modal {...defaultProps} isEditing={true} />);
    fireEvent.click(getByText("Submit"));

    expect(mockUpdatePersonDetails).toHaveBeenCalledTimes(1);
  });
});
