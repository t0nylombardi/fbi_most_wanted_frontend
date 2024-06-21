import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import WantedPersonDetails from "../../components/WantedPersonDetails";
import { WantedPerson } from "../../services/types";

const renderComponent = (person: WantedPerson) => render(<WantedPersonDetails person={person} />);

describe("WantedPersonDetail", () => {
  test('renders "No Details are available for this person." when all details are missing', () => {
    const emptyPerson: WantedPerson = {
      id: "",
      details: "",
      description: "",
      images: [],
      title: "",
      url: "",
      height_min: 0,
      weight_min: 0,
      age_range: "",
      eyes: "",
      hair: "",
      height_max: 0,
      place_of_birth: "",
      race: "",
      sex: "",
      weight_max: 0,
    };

    renderComponent(emptyPerson);

    expect(screen.getByText("No Details are available for this person.")).toBeInTheDocument();
  });

  test("renders the details table when details are present", () => {
    const personWithDetails: WantedPerson = {
      id: "123",
      details: "Details",
      description: "Description",
      images: [],
      title: "Title",
      url: "URL",
      height_min: 0,
      weight_min: 0,
      age_range: "25-30",
      eyes: "Blue",
      hair: "Blonde",
      height_max: 180,
      place_of_birth: "New York",
      race: "Caucasian",
      sex: "Male",
      weight_max: 75,
    };

    renderComponent(personWithDetails);

    expect(screen.getByText("Age range")).toBeInTheDocument();
    expect(screen.getByText("25-30")).toBeInTheDocument();
    expect(screen.getByText("Eyes")).toBeInTheDocument();
    expect(screen.getByText("Blue")).toBeInTheDocument();
    expect(screen.getByText("Hair")).toBeInTheDocument();
    expect(screen.getByText("Blonde")).toBeInTheDocument();
    expect(screen.getByText("Height max")).toBeInTheDocument();
    expect(screen.getByText("180")).toBeInTheDocument();
    expect(screen.getByText("Place of birth")).toBeInTheDocument();
    expect(screen.getByText("New York")).toBeInTheDocument();
    expect(screen.getByText("Race")).toBeInTheDocument();
    expect(screen.getByText("Caucasian")).toBeInTheDocument();
    expect(screen.getByText("Sex")).toBeInTheDocument();
    expect(screen.getByText("Male")).toBeInTheDocument();
    expect(screen.getByText("Weight max")).toBeInTheDocument();
    expect(screen.getByText("75")).toBeInTheDocument();
  });

  test('renders "n/a" for missing details', () => {
    const personWithSomeMissingDetails: WantedPerson = {
      id: "123",
      details: "",
      description: "Description",
      images: [],
      title: "Title",
      url: "URL",
      height_min: 0,
      weight_min: 0,
      age_range: "25-30",
      eyes: "",
      hair: "Blonde",
      height_max: null,
      place_of_birth: "New York",
      race: "Caucasian",
      sex: "Male",
      weight_max: 75,
    };

    renderComponent(personWithSomeMissingDetails);

    expect(screen.getByText("Age range")).toBeInTheDocument();
    expect(screen.getByText("25-30")).toBeInTheDocument();
    expect(screen.getByText("Eyes")).toBeInTheDocument();
    expect(screen.getByText("n/a")).toBeInTheDocument();
    expect(screen.getByText("Hair")).toBeInTheDocument();
    expect(screen.getByText("n/a")).toBeInTheDocument();
    expect(screen.getByText("Height max")).toBeInTheDocument();
    expect(screen.getByText("n/a")).toBeInTheDocument();
    expect(screen.getByText("Place of birth")).toBeInTheDocument();
    expect(screen.getByText("New York")).toBeInTheDocument();
    expect(screen.getByText("Race")).toBeInTheDocument();
    expect(screen.getByText("n/a")).toBeInTheDocument();
    expect(screen.getByText("Sex")).toBeInTheDocument();
    expect(screen.getByText("Male")).toBeInTheDocument();
    expect(screen.getByText("Weight max")).toBeInTheDocument();
    expect(screen.getByText("n/a")).toBeInTheDocument();
  });
});