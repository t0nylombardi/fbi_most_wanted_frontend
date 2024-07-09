import React, { useState, ChangeEvent } from "react";
import { PersonDetails } from "../../services/types";
import { findLongestDetails } from "../../utils/stringUtils";

interface FormInformationProps {
  informationObj: (keyof PersonDetails)[];
  information: PersonDetails;
  onInformationChange: (updatedInformation: PersonDetails) => void;
}

const FormInformation: React.FC<FormInformationProps> = ({
  informationObj,
  information,
  onInformationChange,
}) => {
  const [description, setDescription] = useState<string>(information.description ?? "");
  const [details, setDetails] = useState<string>(information.details ?? "");
  const [caution, setCaution] = useState<string>(information.caution ?? "");
  const [longestInformation, setLongestInformation] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>, field: string) => {
    console.log(e.target.value);
    const value = e.target.value;

    if (field === "description") {
      setDescription(value);
      onInformationChange({
        description: value,
        details: undefined,
        caution: undefined,
      });
    } else if (field === "details") {
      setDetails(value);
      onInformationChange({
        details: value,
        description: undefined,
        caution: undefined,
      });
    } else if (field === "caution") {
      setCaution(value);
      onInformationChange({
        caution: value,
        details: undefined,
        description: undefined,
      });
    }

    // Find the longest information
    const longest = findLongestDetails(
      field === "description" ? value : description,
      field === "details" ? value : details,
      field === "caution" ? value : caution,
    );

    setLongestInformation(longest[0]);
    onInformationChange({
      [longest[1]]: longest[0],
      details: undefined,
      description: undefined,
      caution: undefined,
    });
  };

  return (
    <div>
      <textarea
        value={longestInformation}
        placeholder={longestInformation}
        onChange={e => handleChange(e, longestInformation)}
        className="appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
        rows={10}
      />
    </div>
  );
};

export default FormInformation;
