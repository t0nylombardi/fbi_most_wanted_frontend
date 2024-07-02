import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ImageCardList from "../../components/ImageCardList";
import { WantedPerson } from "../../services/types";
import mockPersons from "../../__mocks__/mockPersons";

describe("ImageCardList", () => {
  const persons: WantedPerson[] = mockPersons;

  test("renders correctly with persons", () => {
    render(<ImageCardList persons={persons} openModal={() => {}} />);
    const imageCards = screen.getAllByRole("button");
    expect(imageCards).toHaveLength(persons.length);
  });

  test("calls openModal with correct person object when button is clicked", () => {
    const mockOpenModal = jest.fn();
    render(<ImageCardList persons={persons} openModal={mockOpenModal} />);
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]); // Simulate click on the first button
    expect(mockOpenModal).toHaveBeenCalledWith(persons[0]);
  });
});
