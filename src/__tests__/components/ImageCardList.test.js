import { jsx as _jsx } from "react/jsx-runtime";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ImageCardList from "../../components/ImageCardList";
import mockPersons from "../../__mocks__/mockPersons";
describe("ImageCardList", () => {
    const persons = mockPersons;
    it("renders correctly with persons", () => {
        render(_jsx(ImageCardList, { persons: persons, openModal: () => { } }));
        const imageCards = screen.getAllByRole("button");
        expect(imageCards).toHaveLength(persons.length);
    });
    it("calls openModal with correct person object when button is clicked", () => {
        const mockOpenModal = jest.fn();
        render(_jsx(ImageCardList, { persons: persons, openModal: mockOpenModal }));
        const buttons = screen.getAllByRole("button");
        fireEvent.click(buttons[0]);
        expect(mockOpenModal).toHaveBeenCalledWith(persons[0]);
    });
});
