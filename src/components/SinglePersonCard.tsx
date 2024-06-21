import React from "react";
import { WantedPerson } from "../services/types";
import ImageCard from "./ImageCard";
import WantedPersonDetails from "./WantedPersonDetails";

type WantedPersonProps = {
  person: WantedPerson;
};

const SinglePersonCard = ({ person }: WantedPersonProps) => {
  return (
    <div id="container" className="p-20 w-auto flex px-24 justify-center relative">
      <div id="container" className="p-20 w-full flex flex-row justify-around relative shadow-2xl">
        <ImageCard image={person.images[0]} />
        <div className="w-full sm:w-[70%] md:w-[60%] lg:w-[50%]">
          <h1 className="text-white font-bold text-3xl mt-6 mb-8">{person.title}</h1>
          <p className="text-white w-full sm:w-[35rem] md:w-[30rem] lg:w-[25rem] mb-10">
            Description: {person.description}
          </p>
          <div id="details" className="flex flex-wrap justify-start items-center gap-4">
            <WantedPersonDetails person={person} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePersonCard;
