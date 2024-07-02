import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PersonDescription from "../../components/PersonDescription";

describe("PersonDescription", () => {
  test("renders the longest detail", () => {
    render(
      <PersonDescription
        description="short"
        details="this is longer"
        caution="longest detail of all three"
      />,
    );
    const descriptionElement = screen.getByRole("description");
    expect(descriptionElement).toHaveTextContent("longest detail of all three");
  });

  test("handles null values correctly", () => {
    render(
      <PersonDescription
        description={null}
        details="non-null detail"
        caution="another non-null detail"
      />,
    );
    const descriptionElement = screen.getByRole("description");
    expect(descriptionElement).toHaveTextContent("non-null detail");
  });

  test('displays "No description available" if all are null or empty', () => {
    render(<PersonDescription description={null} details={null} caution={null} />);
    const descriptionElement = screen.getByRole("description");
    expect(descriptionElement).toHaveTextContent("No description available");
  });

  test("renders description when description is provided", () => {
    const description = "<p>Description of the person</p>";
    render(<PersonDescription description={description} details={null} caution={null} />);
    expect(screen.getByText("Description of the person")).toBeInTheDocument();
  });

  test("renders details when description is null and details are provided", () => {
    const details = "<p>Additional details about the person</p>";
    render(<PersonDescription description={null} details={details} caution={null} />);
    expect(screen.getByText("Additional details about the person")).toBeInTheDocument();
  });

  test("renders HTML content correctly", () => {
    const description = "<p><strong>Description</strong> of the person</p>";
    render(<PersonDescription description={description} details={null} caution={null} />);
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("of the person")).toBeInTheDocument();
  });
});
