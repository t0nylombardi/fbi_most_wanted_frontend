import React from "react";
import { WantedPerson } from "../services/types";
import ImageCard from "./ImageCard";
import WantedPersonDetails from "./WantedPersonDetails";
import PersonDescription from "./PersonDescription";

type WantedPersonProps = {
  person: WantedPerson;
  closeModal?: () => void;
  showCloseModal?: boolean;
  modal?: boolean;
};

const SinglePersonCard = ({
  person,
  closeModal,
  showCloseModal = false,
  modal = false,
}: WantedPersonProps) => {
  return (
    <div
      id="container"
      className={`${modal ? "w-[80rem] h-50" : ""} flex px-24 justify-center relative`}
    >
      <div
        id="container"
        className={`m-12 p-12 bg-gray-800  border border-cyprus-900 rounded-2xl h-full ${
          modal ? "w-[55rem]" : ""
        } flex flex-row justify-around relative shadow-2xl`}
      >
        {showCloseModal && (
          <button onClick={closeModal} className="absolute top-0 right-0 m-4 p-2 ">
            <span className="bg-transparent text-white h-6 w-6 text-2xl block outline-none focus:outline-none">
              ×
            </span>
          </button>
        )}
        <ImageCard image={person.images[0]} caption={true} />
        <div className="flex flex-col justify-around w-full sm:w-[70%] md:w-[60%] lg:w-[50%]">
          <h1 className="text-white font-bold text-3xl mt-6 mb-8">{person.title}</h1>
          <div id="details" className="flex flex-wrap justify-start items-center gap-4">
            <WantedPersonDetails person={person} />
          </div>
          <PersonDescription description={person.description} details={person.details} />
        </div>
      </div>
    </div>
  );
};

export default SinglePersonCard;
