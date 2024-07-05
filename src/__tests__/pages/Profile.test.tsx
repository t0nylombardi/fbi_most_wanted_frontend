import React from "react";
import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../hooks/AuthContext";
import Profile from "../../pages/Profile";
import { splitArrayInHalf } from "../../utils/arrayUtils";
import mockUser from "../../__mocks__/mockUser";

// Mock the CheckBox component
jest.mock("../../components/CheckBox", () => ({ text }: { text: string }) => <div>{text}</div>);

// Mock the splitArrayInHalf function
jest.mock("../../utils/arrayUtils", () => ({
  splitArrayInHalf: jest.fn(),
}));

describe("Profile", () => {
  it("renders error message when AuthContext is not available", () => {
    render(<Profile />);
    expect(screen.getByText(/Error: AuthContext not available/i)).toBeInTheDocument();
  });

  it("renders loading message when user data is not available", () => {
    const authContextValue = { user: null, login: jest.fn(), logout: jest.fn(), isLoggedIn: false };

    render(
      <AuthContext.Provider value={authContextValue}>
        <Profile />
      </AuthContext.Provider>,
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it("renders user profile information correctly", () => {
    const user = mockUser;
    const authContextValue = { user, login: jest.fn(), logout: jest.fn(), isLoggedIn: true };

    (splitArrayInHalf as jest.Mock).mockReturnValue([
      user.promises.slice(0, 2),
      user.promises.slice(2),
    ]);

    render(
      <AuthContext.Provider value={authContextValue}>
        <Profile />
      </AuthContext.Provider>,
    );

    expect(screen.getByText(`Hi, I'm agent Rick Astley`)).toBeInTheDocument();
    expect(screen.getByAltText("My profile pic")).toHaveAttribute("src", user.image.default);
    expect(screen.getByText(/_Things about me/i)).toBeInTheDocument();
    expect(screen.getByText(/I will never:/i)).toBeInTheDocument();

    user.promises.forEach(promise => {
      expect(screen.getByText(promise)).toBeInTheDocument();
    });

    expect(screen.getByRole("link", { name: /Website/i })).toHaveAttribute("href", user.website);
  });
});
