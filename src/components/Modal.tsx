import React, { act, useEffect, useRef } from "react";
import { WantedPerson, PersonDetails } from "../services/types";
import SinglePersonCard from "./SinglePersonCard";
import Form from "./WantedEditForm/FormCard";

interface ModalProps {
  closeModal: () => void;
  person: WantedPerson;
  isEditing: boolean;
  editPersonDetails: (id: string) => void;
  updatePersonDetails: (id: string, updatedDetails: PersonDetails) => void;
  removeWantedPerson: () => void;
}

const Modal = ({
  closeModal,
  person,
  isEditing,
  editPersonDetails,
  updatePersonDetails,
  removeWantedPerson,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  return (
    <>
      <div
        data-testid="modal-component"
        className="modal fixed inset-0 z-50 flex items-center justify-center outline-none focus:outline-none"
      >
        <div role="dialog" ref={modalRef} className="p-4 rounded-lg">
          {isEditing ? (
            <Form person={person} updatePersonDetails={updatePersonDetails} />
          ) : (
            <SinglePersonCard
              person={person}
              closeModal={closeModal}
              showCloseModal={true}
              modal={true}
              editPersonDetails={editPersonDetails}
              removeWantedPerson={removeWantedPerson}
            />
          )}
        </div>
      </div>
      <div id="modal-bg" className="opacity-85 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default Modal;
