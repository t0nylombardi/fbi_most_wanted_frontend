import React from "react";
import { WantedPerson } from "../services/types";
import SinglePersonCard from "./SinglePersonCard";

interface ModalProps {
  closeModal: () => void;
  person: WantedPerson;
}

const Modal = ({ closeModal, person }: ModalProps) => {
  return (
    <>
      <div className="w-full flex justify-center items-center fixed z-50 outline-none focus:outline-none">
        <SinglePersonCard person={person} closeModal={closeModal} showCloseModal={true} />
      </div>
      <div className="opacity-70 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default Modal;
