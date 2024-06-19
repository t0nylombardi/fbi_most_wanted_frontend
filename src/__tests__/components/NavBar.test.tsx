import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import NavBar from "../../components/NavBar";

describe("NavBar component", () => {
  test("renders the NavBar component", () => {
    render(<NavBar />);

    // Check for the presence of the main header element
    const headerElement = screen.getByRole("banner");
    expect(headerElement).toBeInTheDocument();

    // Check for the presence of the home link
    const homeLink = screen.getByRole("link", { name: /FBI WANTED/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });

  test("renders all navigation links", () => {
    render(<NavBar />);

    // List of link titles
    const linkTitles = [
      "Ten Most Wanted",
      "Fugitives",
      "Capitol Violence",
      "Terrorism",
      "Missing Persons",
      "Parental Kidnappings",
      "Seeking Info",
    ];

    // Check if all link titles are rendered
    linkTitles.forEach(title => {
      const linkElement = screen.getByRole("link", { name: title });
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute("href", "#");
    });
  });

  test("renders the menu button", () => {
    render(<NavBar />);

    // Check for the presence of the menu button
    const menuButton = screen.getByRole("button", { name: /Open main menu/i });
    expect(menuButton).toBeInTheDocument();
  });
});
