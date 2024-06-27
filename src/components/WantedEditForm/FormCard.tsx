import React from "react";
import { WantedPerson, PersonDetails } from "../../services/types";
import ImageCard from "../ImageCard";
// import WantedPersonDetails from "../WantedPersonDetails";
// import PersonDescription from "../PersonDescription";
import Button from "../Button";
import { capitalize, removeSeparator } from "../../utils/stringUtils";

type WantedPersonProps = {
  person: WantedPerson;
};

const FormCard = ({ person }: WantedPersonProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value as string;
    });
    console.log(data);
  };

  /**
   * Converts height in inches to feet and inches.
   * @param {number} inches - The height in inches.
   * @returns {string} The height in feet and inches.
   */
  const convertHeightToFeet = (inches: number): string | null => {
    if (inches === 0) return null;
    const feet = Math.floor(inches / 12);
    const remainingInches = inches % 12;
    return `${feet}ft ${remainingInches}in`;
  };

  /**
   * Converts weight into a string.
   * @param {number} weight - The weight in pounds.
   * @returns {string | null} The weight in pounds.
   */
  const convertWeight = (weight: number): string | null => {
    if (weight === 0) return null;
    return `${weight} lbs`;
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

  const details = detailsFromObj
    .map(key => {
      let value = person[key];
      if (key === "height_max" && typeof value === "number") {
        value = convertHeightToFeet(value);
      } else if (key === "weight_max" && typeof value === "number") {
        convertWeight(value);
      }
      return { [key]: value };
    })
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});

  return (
    <form onSubmit={handleSubmit}>
      <div
        id="form-card"
        className={`flex flex-col justify-center relative bg-gray-800 border border-cyprus-700 shadow-2xl rounded-2xl `}
      >
        <div
          id="form-container"
          className={`flex flex-row justify-around relative p-4 bg-gray-800 rounded-2xl w-[60rem]`}
        >
          <button className="absolute top-0 right-0 m-4 p-2 ">
            <span className="bg-transparent text-chilean-fire-500 h-10 w-10 text-3xl block outline-none focus:outline-none">
              ×
            </span>
          </button>

          <ImageCard image={person.images[0]} caption={true} />
          <div className="flex flex-col justify-around w-full sm:w-[70%] md:w-[60%] lg:w-[50%]">
            <h1 className="text-white font-bold text-3xl mt-6 mb-8">{person.title}</h1>
            <div id="details" className="flex flex-wrap justify-start items-center gap-4">
              <table className="table-auto">
                <tbody>
                  {detailsFromObj.map(key => (
                    <tr key={key}>
                      <td className="px-8">{capitalize(removeSeparator(key))}</td>
                      <td className="px-8">
                        <input
                          data-testid={key as string}
                          className="appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                          id={key as string}
                          type="text"
                          placeholder={capitalize(details[key]?.toString()) || "n/a"}
                        ></input>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
          <Button text="Submit" onClick={() => {}} />
          <Button text="Cancle" onClick={() => {}} />
        </div>
      </div>
    </form>
  );
};

export default FormCard;
