import React from "react";
import { WantedPerson, PersonDetails } from "../services/types";
import { capitalize, removeSeparator } from "../utils/stringUtils";

type WantedPersonDetailsProps = {
  person: WantedPerson;
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
    .map(key => ({ [key]: person[key] }))
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});

  return (
    // if all the keys are null or undefined, the table will not render
    // if any of the keys has a value, the table will render
    Object.values(details).every(value => !value) ? (
      <EmptyDetails />
    ) : (
      <table className="table-fit w-full h-full text-xl text-chilean-fire-500">
        <tbody>
          {detailsFromObj.map(key => (
            <tr key={key}>
              <td className="px-8">{capitalize(removeSeparator(key))}</td>
              <td className="px-8">
                {capitalize(details[key] != null ? details[key]?.toString() : "n/a") || "n/a"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  );
};

export default WantedPersonDetails;
