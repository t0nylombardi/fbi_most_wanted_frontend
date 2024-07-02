import React from "react";
import "@testing-library/jest-dom";
import { WantedPerson } from "../../services/types";
import { render, fireEvent } from "@testing-library/react";
import Modal from "../../components/Modal";
import mockPersons from "../../__mocks__/mockPersons";

const mockUpdatePersonDetails = jest.fn();
const mockEditPersonDetails = jest.fn();
const mockRemoveWantedPerson = jest.fn();
const mockCloseModal = jest.fn();

const defaultProps = {
  closeModal: mockCloseModal,
  person: mockPersons[0] as WantedPerson,
  isEditing: false,
  editPersonDetails: mockEditPersonDetails,
  updatePersonDetails: mockUpdatePersonDetails,
  removeWantedPerson: mockRemoveWantedPerson,
};

describe("Modal Component", () => {
  const mockPerson = mockPersons[0];
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
