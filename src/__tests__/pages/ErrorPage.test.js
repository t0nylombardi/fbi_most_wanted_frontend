import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ErrorPage from "../../pages/ErrorPage";
describe("ErrorPage", () => {
    it("renders 404 error message", () => {
        render(_jsx(Router, { children: _jsx(ErrorPage, {}) }));
        expect(screen.getByText("404")).toBeInTheDocument();
        expect(screen.getByText("Page Not Found")).toBeInTheDocument();
        expect(screen.getByText("Go Home")).toBeInTheDocument();
    });
    it("has a link to the home page", () => {
        render(_jsx(Router, { children: _jsx(ErrorPage, {}) }));
        const link = screen.getByRole("link", { name: /Go Home/i });
        expect(link).toHaveAttribute("href", "/");
    });
});
