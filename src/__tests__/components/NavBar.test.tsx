import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import NavBar from "../../components/NavBar"; // Adjust the import path as necessary
import { User } from "../../services/types";
import mockedUser from "../../__mocks__/mockUser";

describe("NavBar Component", () => {
  const mockLogout = jest.fn();

  const renderNavBar = (isLoggedIn: boolean, user: User | null) => {
    return render(
      <BrowserRouter>
        <NavBar logout={mockLogout} isLoggedIn={isLoggedIn} user={user} />
      </BrowserRouter>,
    );
  };

  test("renders nav links correctly", () => {
    renderNavBar(false, null);

    const links = ["All Wanted", "Cyber Crimes", "Missing Persons", "Violent Crims"];
    links.forEach(link => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });
  });

  test('renders "FBI WANTED" heading', () => {
    renderNavBar(false, null);
    expect(screen.getByRole("home")).toHaveTextContent("FBI WANTED");
  });

  test("displays user profile and logout button when logged in", () => {
    renderNavBar(true, mockedUser);

    expect(screen.getByRole("img")).toHaveAttribute("src", mockedUser.image.default);
    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
  });

  test("does not display user profile and logout button when not logged in", () => {
    renderNavBar(false, null);

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /logout/i })).not.toBeInTheDocument();
  });

  test("logout function is called when logout button is clicked", () => {
    renderNavBar(true, mockedUser);

    fireEvent.click(screen.getByRole("button", { name: /logout/i }));
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
