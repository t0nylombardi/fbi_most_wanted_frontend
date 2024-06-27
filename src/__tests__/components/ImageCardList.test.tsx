import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ImageCardList from "../../components/ImageCardList";
import { WantedPerson } from "../../services/types";

describe("ImageCardList", () => {
  const persons: WantedPerson[] = [
    {
      id: "1",
      details: "Details of Rick Sanchez",
      height_min: 170,
      url: "url",
      weight_min: 70,
      title: "Rick Sanchez",
      description: "Description of Rick Sanchez",
      images: [
        {
          large: "image-url",
          caption: "Rick Sanchez",
        },
      ],
      age_range: "75-99",
      eyes: "Brown",
      hair: "grey",
      height_max: 76,
      place_of_birth: "New York",
      race: "Caucasian",
      sex: "Male",
      weight_max: 275,
      subjects: ["Rick", "Sanchez"],
    },
    {
      id: "2",
      details: "Details of Diane Nguyen",
      height_min: 62,
      url: "url",
      weight_min: 95,
      title: "Diane Nguyen",
      description: "Description of Diane Nguyen",
      images: [
        {
          large: "image-url",
          caption: "Diane Nguyen",
        },
      ],
      age_range: "25-30",
      eyes: "Blue",
      hair: "Blonde",
      height_max: 180,
      place_of_birth: "New York",
      race: "Caucasian",
      sex: "Female",
      weight_max: 75,
      subjects: ["Diane", "Nguyen"],
    },
  ];

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
