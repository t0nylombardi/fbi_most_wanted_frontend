import React from "react";
import { WantedPerson, PersonDetails } from "../services/types";
import { capitalize, removeSeparator } from "../utils/stringUtils";

type WantedPersonDetailsProps = {
  person: WantedPerson;
};

/**
 * Converts height in inches to feet and inches.
 * @param {number} inches - The height in inches.
 * @returns {string} The height in feet and inches.
 */
export const convertHeightToFeet = (inches: number): string => {
  if (inches === 0) return "";
  const feet = Math.floor(inches / 12);
  const remainingInches = inches % 12;
  return `${feet}ft ${remainingInches}in`;
};

/**
 * Converts weight into a string.
 * @param {number} weight - The weight in pounds.
 * @returns {string | null} The weight in pounds.
 */
export const convertWeight = (weight: number): string => {
  if (weight === 0) return "";
  return `${weight} lbs`;
};

/**
 * Renders the details section of the wanted person card.
 * @param {WantedPersonDetailsProps} props - The wanted person object.
 * @returns {JSX.Element} The HTML structure for the details section.
 */
const WantedPersonDetails: React.FC<WantedPersonDetailsProps> = ({ person }) => {
  const EmptyDetails = () => {
    return (
      <div className="text-xl text-chilean-fire-500">No Details are available for this person.</div>
    );
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

  return Object.values(details).every(value => !value) ? (
    <EmptyDetails />
  ) : (
    <table
      data-testid="detail-table"
      aria-label="details"
      id="details"
      className="table-fit w-full h-full text-xl text-chilean-fire-500"
    >
      <tbody>
        {detailsFromObj.map(key => (
          <tr key={key}>
            <td className="px-8">{capitalize(removeSeparator(key))}</td>
            <td className="px-8">{capitalize(details[key]?.toString()) || "n/a"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WantedPersonDetails;
