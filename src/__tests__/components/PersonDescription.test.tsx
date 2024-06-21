import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PersonDescription from "../../components/PersonDescription";

describe("PersonDescription", () => {
  test("renders description when description is provided", () => {
    const description = "<p>Description of the person</p>";
    render(<PersonDescription description={description} details={null} />);
    expect(screen.getByText("Description of the person")).toBeInTheDocument();
  });

  test("renders details when description is null and details are provided", () => {
    const details = "<p>Additional details about the person</p>";
    render(<PersonDescription description={null} details={details} />);
    expect(screen.getByText("Additional details about the person")).toBeInTheDocument();
  });

  test('renders "No description available" when both description and details are null', () => {
    render(<PersonDescription description={null} details={null} />);
    expect(screen.getByText("No description available")).toBeInTheDocument();
  });

  test("renders description when both description and details are provided", () => {
    const description = "<p>Description of the person</p>";
    const details = "<p>Additional details about the person</p>";
    render(<PersonDescription description={description} details={details} />);
    expect(screen.getByText("Description of the person")).toBeInTheDocument();
    expect(screen.queryByText("Additional details about the person")).not.toBeInTheDocument();
  });

  test("renders HTML content correctly", () => {
    const description = "<p><strong>Description</strong> of the person</p>";
    render(<PersonDescription description={description} details={null} />);
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("of the person")).toBeInTheDocument();
  });
});
