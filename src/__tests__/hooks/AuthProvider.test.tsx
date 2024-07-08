import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { AuthProvider, useAuth, AuthContext } from "../../hooks/AuthContext";

// Mock localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};

  return {
    getItem: (key: string) => store[key],
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("AuthProvider", () => {
  it("initializes with isLoggedIn false and user null", () => {
    const { getByText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    expect(getByText("isLoggedIn: false")).toBeInTheDocument();
    expect(getByText("user: null")).toBeInTheDocument();
  });

  it("logs in a user successfully", async () => {
    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    fireEvent.change(getByTestId("username-input"), { target: { value: "testuser" } });
    fireEvent.change(getByTestId("password-input"), { target: { value: "testpassword" } });
    fireEvent.click(getByTestId("login-button"));

    await waitFor(() => {
      expect(localStorage.getItem("isLoggedIn")).toBe("true");
      expect(localStorage.getItem("user")).toBeTruthy();
    });
  });

  it("logs out a user successfully", async () => {
    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    // Simulate login first
    fireEvent.change(getByTestId("username-input"), { target: { value: "testuser" } });
    fireEvent.change(getByTestId("password-input"), { target: { value: "testpassword" } });
    fireEvent.click(getByTestId("login-button"));

    // Check if login was successful
    await waitFor(() => {
      expect(localStorage.getItem("isLoggedIn")).toBe("true");
      expect(localStorage.getItem("user")).toBeTruthy();
    });

    // Now simulate logout
    fireEvent.click(getByTestId("logout-button"));

    // Check that localStorage is cleared and state is updated
    await waitFor(() => {
      expect(localStorage.getItem("isLoggedIn")).toBe(undefined);
      expect(localStorage.getItem("user")).toBe(undefined);
    });

    // Check that isLoggedIn and user state reflect logout
    expect(getByTestId("isLoggedIn").textContent).toBe("isLoggedIn: false");
    expect(getByTestId("user").textContent).toBe("user: null");
  });
});

const TestComponent: React.FC = () => {
  const { isLoggedIn, login, logout, user } = useAuth();

  return (
    <div>
      <div data-testid="isLoggedIn">isLoggedIn: {isLoggedIn.toString()}</div>
      <div data-testid="user">user: {user ? JSON.stringify(user) : "null"}</div>
      <input type="text" data-testid="username-input" />
      <input type="password" data-testid="password-input" />
      <button data-testid="login-button" onClick={() => login("testuser", "testpassword")}>
        Login
      </button>
      <button data-testid="logout-button" onClick={logout}>
        Logout
      </button>
    </div>
  );
};
