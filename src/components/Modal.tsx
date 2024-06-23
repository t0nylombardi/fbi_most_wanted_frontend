import React, { useEffect, useRef } from "react";
import { WantedPerson } from "../services/types";
import SinglePersonCard from "./SinglePersonCard";

interface ModalProps {
  closeModal: () => void;
  person: WantedPerson;
}

const Modal = ({ closeModal, person }: ModalProps) => {
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
      <div className="fixed inset-0 z-50 flex items-center justify-center outline-none focus:outline-none">
        <div ref={modalRef} className="w-[rem] p-4 rounded-lg">
          <SinglePersonCard
            person={person}
            closeModal={closeModal}
            showCloseModal={true}
            modal={true}
          />
        </div>
      </div>
      <div className="opacity-85 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default Modal;
