import React from "react";
import { WantedPerson } from "../services/types";
import ImageCard from "./ImageCard";
import WantedPersonDetails from "./WantedPersonDetails";
import PersonDescription from "./PersonDescription";

type WantedPersonProps = {
  person: WantedPerson;
};

const SinglePersonCard = ({ person }: WantedPersonProps) => {
  return (
    <div id="container" className="w-auto flex px-24 justify-center relative">
      <div
        id="container"
        className="m-12 p-12 border border-cyprus-900 rounded-2xl h-full w-full flex flex-row justify-around relative shadow-2xl"
      >
        <ImageCard image={person.images[0]} />
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
