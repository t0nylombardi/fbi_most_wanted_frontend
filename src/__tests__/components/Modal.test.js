import { jsx as _jsx } from "react/jsx-runtime";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import Modal from "../../components/Modal";
import mockPersons from "../../__mocks__/mockPersons";
const mockUpdatePersonDetails = jest.fn();
const mockEditPersonDetails = jest.fn();
const mockRemoveWantedPerson = jest.fn();
const mockCloseModal = jest.fn();
const defaultProps = {
    closeModal: mockCloseModal,
    person: mockPersons[0],
    isEditing: false,
    editPersonDetails: mockEditPersonDetails,
    updatePersonDetails: mockUpdatePersonDetails,
    removeWantedPerson: mockRemoveWantedPerson,
};
describe("Modal Component", () => {
    const mockPerson = mockPersons[0];
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("renders SinglePersonCard when isEditing is false", () => {
        const { getByText } = render(_jsx(Modal, { ...defaultProps }));
        expect(getByText(mockPerson.title)).toBeInTheDocument();
    });
    it("renders Form when isEditing is true", () => {
        const { getByText } = render(_jsx(Modal, { ...defaultProps, isEditing: true }));
        expect(getByText("Submit")).toBeInTheDocument();
    });
    it("calls closeModal when clicking outside the modal", () => {
        render(_jsx(Modal, { ...defaultProps }));
        fireEvent.mouseDown(document.body);
        expect(mockCloseModal).toHaveBeenCalledTimes(1);
    });
    it("calls updatePersonDetails when submitting the Form", () => {
        const { getByText } = render(_jsx(Modal, { ...defaultProps, isEditing: true }));
        fireEvent.click(getByText("Submit"));
        expect(mockUpdatePersonDetails).toHaveBeenCalledTimes(1);
    });
});
