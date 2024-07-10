import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import Modal from "./Modal";
import { wanted } from "../services/fetchWantedPersonsService";
const ModalManager = ({ persons, activePerson, setActivePerson, setPersons, }) => {
    const [isEditing, setIsEditing] = useState(false);
    const closeModal = () => {
        setActivePerson(null);
    };
    const updatePersonDetails = async (id, updatedDetails) => {
        setIsEditing(true);
        try {
            const result = await wanted.update(id, updatedDetails);
            if (!result) {
                throw new Error("Failed to update person details");
            }
            const updatedPersons = persons.map(person => person.id === id ? { ...person, ...result } : person);
            setPersons(updatedPersons);
            setActivePerson(result);
            setIsEditing(false);
        }
        catch (error) {
            console.log(error);
            setIsEditing(false);
        }
    };
    const removeWantedPerson = async (id) => {
        await wanted.delete(id);
        const updatedPersons = persons.filter(person => person.id !== id);
        setPersons(updatedPersons);
        closeModal();
    };
    return (_jsxs(_Fragment, { children: [activePerson && (_jsx(Modal, { person: activePerson, closeModal: closeModal, isEditing: isEditing, editPersonDetails: () => setIsEditing(true), removeWantedPerson: () => removeWantedPerson(activePerson.id), updatePersonDetails: updatePersonDetails })), _jsx("span", { "data-testid": "isEditing-state", style: { display: "none" }, children: isEditing.toString() })] }));
};
export default ModalManager;
