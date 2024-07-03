import React, { useState, useCallback } from "react";
import Modal from "./Modal";
import { WantedPerson, PersonDetails } from "../services/types";
import { wanted } from "../services/endpoints";

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
      const result = await wanted.update(id, updatedDetails);
      console.log("Updated person details: ", result);
      const updatedPersonIndex = activePerson
        ? persons.findIndex(person => person.id === activePerson.id)
        : -1;
      persons[updatedPersonIndex] = result;
      setPersons([...persons]);
      setActivePerson(result);
      setIsEditing(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activePerson, persons, setPersons, closeModal],
  );

  const removeWantedPerson = useCallback(
    async (id: string) => {
      await wanted.delete(id);
      const updatedPersons = persons.filter(person => person.id !== id);
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
    </>
  );
};

export default ModalManager;
