import React, { useState } from "react";
import { WantedPerson, PersonDetails } from "../../services/types";
import ImageCard from "../ImageCard";
import FormDetails from "./FormDetails";
import Button from "../Button";

type FormCardProps = {
  person: WantedPerson;
  updatePersonDetails: (id: string, updatedDetails: Partial<PersonDetails>) => void;
};

const FormCard = ({ person, updatePersonDetails }: FormCardProps) => {
  const [formDetails, setFormDetails] = useState<PersonDetails>({ ...person });

  const handleDetailsChange = (updatedDetails: Partial<PersonDetails>) => {
    setFormDetails(prevDetails => ({
      ...prevDetails,
      ...updatedDetails,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePersonDetails(person.id, formDetails);
  };

  const detailsFromObj: (keyof PersonDetails)[] = [
    "age_range",
    "eyes",
    "hair",
    "height_max",
    "place_of_birth",
    "race",
    "sex",
    "weight_max",
  ];

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col justify-center relative bg-gray-800 border border-cyprus-700 shadow-2xl rounded-2xl">
        <div className="flex flex-row justify-around relative p-4 bg-gray-800 rounded-2xl w-[80rem]">
          <button className="absolute top-0 right-0 m-4 p-2 ">
            <span className="bg-transparent text-chilean-fire-500 h-10 w-10 text-3xl block outline-none focus:outline-none">
              ×
            </span>
          </button>

          <ImageCard image={person.images[0]} caption={true} />
          <div className="flex flex-col justify-around w-full sm:w-[70%] md:w-[60%] lg:w-[50%]">
            <h1 className="text-white font-bold text-3xl mt-6 mb-8">{person.title}</h1>
            <FormDetails
              detailsObj={detailsFromObj}
              details={formDetails}
              onDetailsChange={handleDetailsChange}
            />
            <div className="py-8">
              <textarea
                id="description"
                rows={10}
                placeholder={person.description || person.details || "No description available"}
                className="text-white w-full mb-10"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center pb-8">
          <Button text="Submit" type="submit" />
          <Button text="Cancel" onClick={() => {}} />
        </div>
      </div>
    </form>
  );
};

export default FormCard;
