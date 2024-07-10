import { jsx as _jsx } from "react/jsx-runtime";
import { act } from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoadingScreen from "../../components/LoadingScreen";
import { loadingMessages } from "../../services/constants";
describe("LoadingScreen", () => {
    jest.useFakeTimers();
    it("renders loading message", () => {
        render(_jsx(LoadingScreen, {}));
        const loadingMessageElement = screen.getByTestId("loading-message");
        expect(loadingMessageElement).toBeInTheDocument();
        expect(loadingMessages).toContain(loadingMessageElement.textContent);
    });
    it("updates loading message every 2 seconds", () => {
        jest.useFakeTimers();
        render(_jsx(LoadingScreen, {}));
        const loadingMessageElement = screen.getByTestId("loading-message");
        const initialMessage = loadingMessageElement.textContent;
        expect(loadingMessages).toContain(initialMessage);
        act(() => {
            jest.advanceTimersByTime(2000);
        });
        const newMessage = loadingMessageElement.textContent;
        expect(loadingMessages).toContain(newMessage);
        expect(newMessage).not.toBe(initialMessage);
        act(() => {
            jest.advanceTimersByTime(2000);
        });
        const nextMessage = loadingMessageElement.textContent;
        expect(loadingMessages).toContain(nextMessage);
        expect(nextMessage).not.toBe(newMessage);
        jest.useRealTimers();
    });
    it("clears interval on unmount", () => {
        const { unmount } = render(_jsx(LoadingScreen, {}));
        const clearIntervalSpy = jest.spyOn(window, "clearInterval");
        unmount();
        expect(clearIntervalSpy).toHaveBeenCalled();
    });
});
