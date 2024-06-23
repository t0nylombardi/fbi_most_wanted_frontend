import React, { useState } from "react";
import ImageCard from "./ImageCard";
import { WantedPerson } from "../services/types";
import Modal from "./Modal";

interface ImageCardListProps {
  persons: WantedPerson[];
}

const ImageCardList = ({ persons }: ImageCardListProps) => {
  const [activePerson, setActivePerson] = useState<WantedPerson | null>(null);

  const openModal = (person: WantedPerson) => {
    setActivePerson(person);
  };

  const closeModal = () => {
    setActivePerson(null);
  };

  return (
    <div className="mx-auto grid gap-x-2 gap-y-1 grid-cols-5">
      {persons.map(person => (
        <button key={person.id} onClick={() => openModal(person)}>
          <ImageCard image={person.images[0]} caption={false} />
        </button>
      ))}
      {activePerson && <Modal person={activePerson} closeModal={closeModal} />}
    </div>
  );
};

export default ImageCardList;
