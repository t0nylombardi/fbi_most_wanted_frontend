import React from "react";
import ImageCard from "./ImageCard";
import { WantedPerson } from "../services/types";

interface ImageCardListProps {
  persons: WantedPerson[];
  openModal: (person: WantedPerson) => void;
}

const ImageCardList = ({ persons, openModal }: ImageCardListProps) => {
  return (
    <div className="grid gap-4 grid-cols-5">
      {persons.map(person => (
        <div key={person.id} className="flex justify-center items-center">
          <button onClick={() => openModal(person)}>
            <ImageCard image={person.images[0]} caption={false} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ImageCardList;
