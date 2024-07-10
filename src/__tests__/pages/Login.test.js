import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent } from "@testing-library/react";
import { useAuth } from "../../hooks/AuthContext";
import Login from "../../pages/Login";
jest.mock("../../hooks/AuthContext");
const mockUseAuth = useAuth;
describe("Login", () => {
    const loginMock = jest.fn();
    beforeEach(() => {
        mockUseAuth.mockReturnValue({
            login: loginMock,
            logout: jest.fn(),
            isLoggedIn: false,
            user: null,
        });
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it("renders the login form", () => {
        render(_jsx(Login, {}));
        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    });
    it("updates form data on input change", () => {
        render(_jsx(Login, {}));
        const usernameInput = screen.getByLabelText(/username/i);
        const passwordInput = screen.getByLabelText(/password/i);
        fireEvent.change(usernameInput, { target: { value: "testuser" } });
        fireEvent.change(passwordInput, { target: { value: "testpassword" } });
        expect(usernameInput.value).toBe("testuser");
        expect(passwordInput.value).toBe("testpassword");
    });
    it("calls login function on form submit", () => {
        render(_jsx(Login, {}));
        const usernameInput = screen.getByLabelText(/username/i);
        const passwordInput = screen.getByLabelText(/password/i);
        const loginButton = screen.getByRole("button", { name: /login/i });
        fireEvent.change(usernameInput, { target: { value: "testuser" } });
        fireEvent.change(passwordInput, { target: { value: "testpassword" } });
        fireEvent.click(loginButton);
        expect(loginMock).toHaveBeenCalledWith("testuser", "testpassword");
    });
});
