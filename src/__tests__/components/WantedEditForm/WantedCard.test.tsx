import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import FormCard from "../../../components/WantedEditForm/FormCard";
import mockPersons from "../../../__mocks__/mockPersons";

const mockPerson = mockPersons[0];
const mockUpdatePersonDetails = jest.fn();

describe("FormCard Component", () => {
  beforeEach(() => {
    render(<FormCard person={mockPerson} updatePersonDetails={mockUpdatePersonDetails} />);
  });

  it("renders the form with initial details", () => {
    const titleElement = screen.getByText("John Doe");
    expect(titleElement).toBeInTheDocument();

    const ageRangeInput = screen.getByTestId("age_range-value");
    expect(ageRangeInput).toHaveValue("25-30");

    const hairInput = screen.getByTestId("hair-value");
    expect(hairInput).toHaveValue("Blonde");
  });

  it("updates details correctly when inputs change", () => {
    const newHairValue = "Red";
    const hairInput = screen.getByTestId("hair-value");
    fireEvent.change(hairInput, { target: { value: newHairValue } });

    expect(hairInput).toHaveValue(newHairValue);
  });

  it("calls updatePersonDetails when form is submitted", () => {
    const submitButton = screen.getByTestId("update-person-details");
    fireEvent.click(submitButton);

    expect(mockUpdatePersonDetails).toHaveBeenCalledWith("1", expect.any(Object));
  });

  // Add more test cases as needed for form interactions and edge cases
});
