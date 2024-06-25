import React from "react";
import { WantedPerson } from "../../services/types";
import ImageCard from "../ImageCard";
import WantedPersonDetails from "../WantedPersonDetails";
import PersonDescription from "../PersonDescription";
import Button from "../Button";

type WantedPersonProps = {
  person: WantedPerson;
};

const Form = ({ person }: WantedPersonProps) => {
  return (
    <div
      id="single-person-card"
      className={`flex flex-col justify-center relative bg-gray-800 border border-cyprus-700 shadow-2xl rounded-2xl `}
    >
      <div
        id="inner-container"
        className={`flex flex-row justify-around relative p-4 bg-gray-800 rounded-2xl`}
      >
        <button>
          <ImageCard image={person.images[0]} caption={true} />
        </button>
        <div className="flex flex-col justify-around w-full sm:w-[70%] md:w-[60%] lg:w-[50%]">
          <h1 className="text-white font-bold text-3xl mt-6 mb-8">{person.title}</h1>
          <div id="details" className="flex flex-wrap justify-start items-center gap-4">
            <WantedPersonDetails person={person} />
          </div>
          <PersonDescription description={person.description} details={person.details} />
        </div>
      </div>
      <div className="flex flex-row justify-center pb-8">
        <Button text="edit" onClick={() => {}} />
        <Button text="remove" onClick={() => {}} />
      </div>
    </div>
  );
};

export default Form;
