import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ModalManager from "../../components/ModalManager";
import { wanted } from "../../services/fetchWantedPersonsService";
import mockPersons from "../../__mocks__/mockPersons";

jest.mock("../../services/fetchWantedPersonsService");

describe("ModalManager", () => {
  let consoleErrorMock: jest.SpyInstance;

  beforeAll(() => {
    consoleErrorMock = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    consoleErrorMock.mockRestore();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should update person details and state correctly", async () => {
    const setActivePerson = jest.fn();
    const setPersons = jest.fn();

    const updateMock = jest.spyOn(wanted, "update");
    updateMock.mockResolvedValueOnce({ ...mockPersons[0], hair: "red" });

    render(
      <ModalManager
        persons={mockPersons}
        activePerson={mockPersons[0]}
        setActivePerson={setActivePerson}
        setPersons={setPersons}
      />,
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("edit-person-details"));

    const hairInput = screen.getByTestId("hair-value");
    fireEvent.change(hairInput, { target: { value: "red" } });

    fireEvent.click(screen.getByTestId("update-person-details"));

    await waitFor(() => {
      expect(setPersons).toHaveBeenCalledWith([
        { ...mockPersons[0], hair: "red" },
        { ...mockPersons[1] },
      ]);
    });
  });

  it("should close the modal when close button is clicked", () => {
    const setActivePerson = jest.fn();
    const setPersons = jest.fn();

    render(
      <ModalManager
        persons={mockPersons}
        activePerson={mockPersons[0]}
        setActivePerson={setActivePerson}
        setPersons={setPersons}
      />,
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("close-modal"));

    expect(setActivePerson).toHaveBeenCalledWith(null);
  });

  it("should remove a person from the list correctly", async () => {
    const setActivePerson = jest.fn();
    const setPersons = jest.fn();

    const deleteMock = jest.spyOn(wanted, "delete");
    deleteMock.mockResolvedValueOnce(Promise.resolve());

    render(
      <ModalManager
        persons={mockPersons}
        activePerson={mockPersons[0]}
        setActivePerson={setActivePerson}
        setPersons={setPersons}
      />,
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("remove-person"));

    await waitFor(() => {
      expect(setPersons).toHaveBeenCalledWith([mockPersons[1]]);
    });

    expect(setActivePerson).toHaveBeenCalledWith(null);
  });

  it("should handle errors gracefully during update", async () => {
    const originalError = console.error;
    console.error = jest.fn();

    const setActivePerson = jest.fn();
    const setPersons = jest.fn();

    const updateMock = jest.spyOn(wanted, "update");
    updateMock.mockRejectedValueOnce(new Error("Update failed"));

    render(
      <ModalManager
        persons={mockPersons}
        activePerson={mockPersons[0]}
        setActivePerson={setActivePerson}
        setPersons={setPersons}
      />,
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("edit-person-details"));
    const hairInput = screen.getByTestId("hair-value");
    fireEvent.change(hairInput, { target: { value: "red" } });
    fireEvent.click(screen.getByTestId("update-person-details"));

    await waitFor(() => {
      expect(setPersons).not.toHaveBeenCalled();
    });

    expect(screen.getByTestId("isEditing-state")).toHaveTextContent("false");

    console.error = originalError; // Restore console.error
  });
});
