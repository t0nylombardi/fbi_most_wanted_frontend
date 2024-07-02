import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SinglePersonCard from "../../components/SinglePersonCard";
import { WantedPerson } from "../../services/types";
import mockPersons from "../../__mocks__/mockPersons";

const mockPerson = mockPersons[0] as WantedPerson;

const mockEditPersonDetails = jest.fn();
const mockRemoveWantedPerson = jest.fn();
const mockCloseModal = jest.fn();

describe("SinglePersonCard Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with the given person data", () => {
    render(
      <SinglePersonCard
        person={mockPerson}
        editPersonDetails={mockEditPersonDetails}
        removeWantedPerson={mockRemoveWantedPerson}
      />,
    );

    expect(screen.getByTestId("person-title")).toBeInTheDocument();
    expect(screen.getByTestId("person-description")).toBeInTheDocument();
    expect(screen.getByText("Blue")).toBeInTheDocument(); // Checking one detail
  });

  it("renders close button when showCloseModal is true", () => {
    render(
      <SinglePersonCard
        person={mockPerson}
        editPersonDetails={mockEditPersonDetails}
        removeWantedPerson={mockRemoveWantedPerson}
        closeModal={mockCloseModal}
        showCloseModal={true}
      />,
    );

    const closeButton = screen.getByText("×");
    expect(closeButton).toBeInTheDocument();
  });

  it("does not render close button when showCloseModal is false", () => {
    render(
      <SinglePersonCard
        person={mockPerson}
        editPersonDetails={mockEditPersonDetails}
        removeWantedPerson={mockRemoveWantedPerson}
        closeModal={mockCloseModal}
        showCloseModal={false}
      />,
    );

    const closeButton = screen.queryByText("×");
    expect(closeButton).not.toBeInTheDocument();
  });

  it("calls editPersonDetails with correct id when edit button is clicked", () => {
    render(
      <SinglePersonCard
        person={mockPerson}
        editPersonDetails={mockEditPersonDetails}
        removeWantedPerson={mockRemoveWantedPerson}
      />,
    );

    const editButton = screen.getByText("edit");
    fireEvent.click(editButton);

    expect(mockEditPersonDetails).toHaveBeenCalledWith(mockPerson.id);
    expect(mockEditPersonDetails).toHaveBeenCalledTimes(1);
  });

  it("calls removeWantedPerson with correct id when remove button is clicked", () => {
    render(
      <SinglePersonCard
        person={mockPerson}
        editPersonDetails={mockEditPersonDetails}
        removeWantedPerson={mockRemoveWantedPerson}
      />,
    );

    const removeButton = screen.getByText("remove");
    fireEvent.click(removeButton);

    expect(mockRemoveWantedPerson).toHaveBeenCalledWith(mockPerson.id);
    expect(mockRemoveWantedPerson).toHaveBeenCalledTimes(1);
  });

  it("calls closeModal when close button is clicked", () => {
    render(
      <SinglePersonCard
        person={mockPerson}
        editPersonDetails={mockEditPersonDetails}
        removeWantedPerson={mockRemoveWantedPerson}
        closeModal={mockCloseModal}
        showCloseModal={true}
      />,
    );

    const closeButton = screen.getByText("×");
    fireEvent.click(closeButton);

    expect(mockCloseModal).toHaveBeenCalledTimes(1);
  });
});
