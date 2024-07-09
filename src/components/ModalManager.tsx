import React, { useState } from "react";
import Modal from "./Modal";
import { WantedPerson, PersonDetails } from "../services/types";
import { wanted } from "../services/fetchWantedPersonsService";

interface ModalManagerProps {
  persons: WantedPerson[];
  activePerson: WantedPerson | null;
  setActivePerson: (person: WantedPerson | null) => void;
  setPersons: (persons: WantedPerson[]) => void;
}

const ModalManager: React.FC<ModalManagerProps> = ({
  persons,
  activePerson,
  setActivePerson,
  setPersons,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const closeModal = () => {
    setActivePerson(null);
  };

  const updatePersonDetails = async (id: string, updatedDetails: Partial<PersonDetails>) => {
    setIsEditing(true);

    try {
      const result = await wanted.update(id, updatedDetails);

      if (!result) {
        throw new Error("Failed to update person details");
      }

      const updatedPersons = persons.map(person =>
        person.id === id ? { ...person, ...result } : person,
      );

      setPersons(updatedPersons);
      setIsEditing(false);
    } catch (error) {
      console.log(error);
      setIsEditing(false);
    }
  };

  const removeWantedPerson = async (id: string) => {
    await wanted.delete(id);
    const updatedPersons = persons.filter(person => person.id !== id);

    setPersons(updatedPersons);
    closeModal();
  };

  return (
    <>
      {activePerson && (
        <Modal
          person={activePerson}
          closeModal={closeModal}
          isEditing={isEditing}
          editPersonDetails={() => setIsEditing(true)}
          removeWantedPerson={() => removeWantedPerson(activePerson.id)}
          updatePersonDetails={updatePersonDetails}
        />
      )}
      <span data-testid="isEditing-state" style={{ display: "none" }}>
        {isEditing.toString()}
      </span>
    </>
  );
};

export default ModalManager;
