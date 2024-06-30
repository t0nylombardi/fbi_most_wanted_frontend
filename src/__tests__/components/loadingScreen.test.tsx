import React, { act } from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoadingScreen from "../../components/LoadingScreen";
import { loadingMessages } from "../../services/constants";

describe("LoadingScreen", () => {
  jest.useFakeTimers();

  test("renders loading message", () => {
    render(<LoadingScreen />);
    const loadingMessageElement = screen.getByTestId("loading-message");
    expect(loadingMessageElement).toBeInTheDocument();
    expect(loadingMessages).toContain(loadingMessageElement.textContent);
  });

  test("updates loading message every 2 seconds", () => {
    jest.useFakeTimers();

    render(<LoadingScreen />);

    const loadingMessageElement = screen.getByTestId("loading-message");

    // Get the initial loading message
    const initialMessage = loadingMessageElement.textContent;
    expect(loadingMessages).toContain(initialMessage);

    // Advance timers by 2 seconds within act
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    // Expect the loading message to be different
    const newMessage = loadingMessageElement.textContent;
    expect(loadingMessages).toContain(newMessage);
    expect(newMessage).not.toBe(initialMessage);

    // Advance timers by another 2 seconds and check again within act
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    const nextMessage = loadingMessageElement.textContent;
    expect(loadingMessages).toContain(nextMessage);
    expect(nextMessage).not.toBe(newMessage);

    // Cleanup fake timers
    jest.useRealTimers();
  });

  test("clears interval on unmount", () => {
    const { unmount } = render(<LoadingScreen />);
    const clearIntervalSpy = jest.spyOn(window, "clearInterval");
    unmount();
    expect(clearIntervalSpy).toHaveBeenCalled();
  });
});
