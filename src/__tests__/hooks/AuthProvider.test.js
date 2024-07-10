import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { AuthProvider, useAuth } from "../../hooks/AuthContext";
const localStorageMock = (() => {
    let store = {};
    return {
        getItem: (key) => store[key],
        setItem: (key, value) => {
            store[key] = value.toString();
        },
        removeItem: (key) => {
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
        const { getByText } = render(_jsx(AuthProvider, { children: _jsx(TestComponent, {}) }));
        expect(getByText("isLoggedIn: false")).toBeInTheDocument();
        expect(getByText("user: null")).toBeInTheDocument();
    });
    it("logs in a user successfully", async () => {
        const { getByTestId } = render(_jsx(AuthProvider, { children: _jsx(TestComponent, {}) }));
        fireEvent.change(getByTestId("username-input"), { target: { value: "testuser" } });
        fireEvent.change(getByTestId("password-input"), { target: { value: "testpassword" } });
        fireEvent.click(getByTestId("login-button"));
        await waitFor(() => {
            expect(localStorage.getItem("isLoggedIn")).toBe("true");
            expect(localStorage.getItem("user")).toBeTruthy();
        });
    });
    it("logs out a user successfully", async () => {
        const { getByTestId } = render(_jsx(AuthProvider, { children: _jsx(TestComponent, {}) }));
        fireEvent.change(getByTestId("username-input"), { target: { value: "testuser" } });
        fireEvent.change(getByTestId("password-input"), { target: { value: "testpassword" } });
        fireEvent.click(getByTestId("login-button"));
        await waitFor(() => {
            expect(localStorage.getItem("isLoggedIn")).toBe("true");
            expect(localStorage.getItem("user")).toBeTruthy();
        });
        fireEvent.click(getByTestId("logout-button"));
        await waitFor(() => {
            expect(localStorage.getItem("isLoggedIn")).toBe(undefined);
            expect(localStorage.getItem("user")).toBe(undefined);
        });
        expect(getByTestId("isLoggedIn").textContent).toBe("isLoggedIn: false");
        expect(getByTestId("user").textContent).toBe("user: null");
    });
});
const TestComponent = () => {
    const { isLoggedIn, login, logout, user } = useAuth();
    return (_jsxs("div", { children: [_jsxs("div", { "data-testid": "isLoggedIn", children: ["isLoggedIn: ", isLoggedIn.toString()] }), _jsxs("div", { "data-testid": "user", children: ["user: ", user ? JSON.stringify(user) : "null"] }), _jsx("input", { type: "text", "data-testid": "username-input" }), _jsx("input", { type: "password", "data-testid": "password-input" }), _jsx("button", { "data-testid": "login-button", onClick: () => login("testuser", "testpassword"), children: "Login" }), _jsx("button", { "data-testid": "logout-button", onClick: logout, children: "Logout" })] }));
};
