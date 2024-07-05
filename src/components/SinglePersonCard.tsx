import React from "react";
import { WantedPerson } from "../services/types";
import ImageCard from "./ImageCard";
import WantedPersonDetails from "./WantedPersonDetails";
import PersonDescription from "./PersonDescription";
import CTA from "./CTA";
import { capitalize, removeSeparator } from "../utils/stringUtils";

type WantedPersonProps = {
  person: WantedPerson;
  closeModal?: () => void;
  showCloseModal?: boolean;
  modal?: boolean;
  editPersonDetails: (id: string) => void;
  removeWantedPerson?: (id: string) => void;
};

const SinglePersonCard = ({
  person,
  closeModal,
  showCloseModal = false,
  modal = false,
  editPersonDetails,
  removeWantedPerson,
}: WantedPersonProps) => {
  return (
    <div
      id="single-person-card"
      className={`flex flex-col justify-center relative bg-gray-800 border border-cyprus-700 shadow-2xl rounded-2xl `}
    >
      <div
        id="inner-container"
        className={`flex flex-row justify-around relative p-4 bg-gray-800 rounded-2xl ${
          modal ? "w-[80rem]" : ""
        }`}
      >
        {showCloseModal && (
          <button onClick={closeModal} className="absolute top-0 right-0 m-4 p-2 ">
            <span className="bg-transparent text-chilean-fire-500 h-10 w-10 text-3xl block outline-none focus:outline-none">
              ×
            </span>
          </button>
        )}
        <ImageCard image={person.images[0]} caption={true} />
        <div className="flex flex-col justify-around w-full sm:w-[70%] md:w-[60%] lg:w-[50%]">
          <h1
            className="text-white font-bold text-3xl mt-6 mb-8"
            data-testid="person-title"
            role="title"
          >
            {capitalize(removeSeparator(person.title || ""))}
          </h1>
          <div id="details" className="flex flex-wrap justify-start items-center gap-4">
            <WantedPersonDetails person={person} />
          </div>
          <PersonDescription
            description={person.description}
            details={person.details}
            caution={person.caution}
          />
        </div>
      </div>
      <div className="flex flex-row justify-center pb-8">
        <CTA text="edit" onClick={() => editPersonDetails && editPersonDetails(person.id)} />
        <CTA text="remove" onClick={() => removeWantedPerson && removeWantedPerson(person.id)} />
      </div>
    </div>
  );
};

export default SinglePersonCard;
