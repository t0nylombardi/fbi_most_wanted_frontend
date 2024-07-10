import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import SinglePersonCard from "./SinglePersonCard";
import Form from "./WantedEditForm/FormCard";
const Modal = ({ closeModal, person, isEditing, editPersonDetails, updatePersonDetails, removeWantedPerson, }) => {
    const modalRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                closeModal();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [closeModal]);
    return (_jsxs(_Fragment, { children: [_jsx("div", { "data-testid": "modal-component", className: "modal fixed inset-0 z-50 flex items-center justify-center outline-none focus:outline-none", children: _jsx("div", { role: "dialog", ref: modalRef, className: "p-4 rounded-lg", children: isEditing ? (_jsx(Form, { person: person, updatePersonDetails: updatePersonDetails })) : (_jsx(SinglePersonCard, { person: person, closeModal: closeModal, showCloseModal: true, modal: true, editPersonDetails: editPersonDetails, removeWantedPerson: removeWantedPerson })) }) }), _jsx("div", { id: "modal-bg", className: "opacity-85 fixed inset-0 z-40 bg-black" })] }));
};
export default Modal;
