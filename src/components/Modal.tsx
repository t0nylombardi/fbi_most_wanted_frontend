import React, { useEffect, useRef } from "react";
import { WantedPerson } from "../services/types";
import SinglePersonCard from "./SinglePersonCard";
import Form from "./WantedEditForm/FormCard";

interface ModalProps {
  closeModal: () => void;
  person: WantedPerson;
  isEditing: boolean;
  editWantedPerson: (id: string) => void;
  removeWantedPerson: () => void;
}

const Modal = ({
  closeModal,
  person,
  isEditing,
  editWantedPerson,
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
      <div className="modal fixed inset-0 z-50 flex items-center justify-center outline-none focus:outline-none">
        <div role="dialog" ref={modalRef} className="p-4 rounded-lg">
          {isEditing ? (
            <Form person={person} />
          ) : (
            <SinglePersonCard
              person={person}
              closeModal={closeModal}
              showCloseModal={true}
              modal={true}
              editWantedPerson={editWantedPerson}
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
