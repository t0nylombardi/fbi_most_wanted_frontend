import React, { useState, useCallback } from "react";
import Modal from "./Modal";
import { WantedPerson, PersonDetails } from "../services/types";
import { wanted } from "../services/fetchWantedPersonsService";

interface ModalManagerProps {
  persons: WantedPerson[];
  activePerson: WantedPerson | null;
  setActivePerson: React.Dispatch<React.SetStateAction<WantedPerson | null>>;
  setPersons: React.Dispatch<React.SetStateAction<WantedPerson[]>>;
}

const ModalManager: React.FC<ModalManagerProps> = ({
  persons,
  activePerson,
  setActivePerson,
  setPersons,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const closeModal = useCallback(() => {
    setActivePerson(null);
  }, [setActivePerson]);

  const updatePersonDetails = useCallback(
    async (id: string, updatedDetails: Partial<PersonDetails>) => {
      setIsEditing(true);

      try {
        console.log("Updating person details for ID:", id);
        console.log("Updated details:", updatedDetails);

        const result = await wanted.update(id, updatedDetails);
        console.log("Update result:", result);

        if (!result) {
          throw new Error("Failed to update person details");
        }

        const updatedPersonIndex = activePerson
          ? persons.findIndex(person => person.id === activePerson.id)
          : -1;

        persons[updatedPersonIndex] = result;
        console.log("Updated persons array:", persons);

        setPersons([...persons]);
        setActivePerson(result);
        setIsEditing(false);
      } catch (error) {
        console.error("Error updating person details:", error);
        setIsEditing(false);
      }
    },
    [activePerson, persons, setPersons, closeModal],
  );

  const removeWantedPerson = useCallback(
    async (id: string) => {
      console.log("Removing person with ID:", id);

      await wanted.delete(id);
      const updatedPersons = persons.filter(person => person.id !== id);
      console.log("Updated persons after deletion:", updatedPersons);

      setPersons(updatedPersons);
      closeModal();
    },
    [persons, setPersons, closeModal],
  );

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
