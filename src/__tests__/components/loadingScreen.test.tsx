import React, { act } from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoadingScreen from "../../components/LoadingScreen";
import { loadingMessages } from "../../services/constants";

describe("LoadingScreen", () => {
  jest.useFakeTimers();

  test("renders loading message from the list", () => {
    render(<LoadingScreen />);
    const messageElement = screen.getByText(content => {
      return loadingMessages.includes(content);
    });
    expect(messageElement).toBeInTheDocument();
  });

  test("updates loading message every 2 seconds", () => {
    render(<LoadingScreen />);
    const firstMessage = screen.getByText(content => {
      return loadingMessages.includes(content);
    }).textContent;

    console.log("firstMessage: ", firstMessage);

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    const secondMessage = screen.getByText(content => {
      return loadingMessages.includes(content);
    }).textContent;

    console.log("secondMessage", secondMessage);
    expect(firstMessage).not.toBe(secondMessage);
  });

  test("clears interval on unmount", () => {
    const { unmount } = render(<LoadingScreen />);
    const clearIntervalSpy = jest.spyOn(window, "clearInterval");
    unmount();
    expect(clearIntervalSpy).toHaveBeenCalled();
  });
});
