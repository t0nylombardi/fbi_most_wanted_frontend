import React from "react";
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

    const links = [
      { title: "Ten Most Wanted", url: "/top-ten" },
      { title: "Wanted", url: "/wanted" },
      { title: "Terrorism", url: "/terrorism" },
      { title: "Seeking Information", url: "/seeking-info" },
      { title: "Kidnappings", url: "/kifnappings" },
      { title: "Missing Persons", url: "/missing-persons" },
    ];

    // Check if all link titles and urls
    links.forEach(link => {
      const linkElement = screen.getByRole("link", { name: link.title });
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute("href", link.url);
    });
  });

  test("renders the menu button", () => {
    render(<NavBar />);

    // Check for the presence of the menu button
    const menuButton = screen.getByRole("button", { name: /Open main menu/i });
    expect(menuButton).toBeInTheDocument();
  });
});
