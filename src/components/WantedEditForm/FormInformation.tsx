import React, { useState, ChangeEvent, useEffect } from "react";
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
  const [description, setDescription] = useState(information.description ?? "");
  const [details, setDetails] = useState(information.details ?? "");
  const [caution, setCaution] = useState(information.caution ?? "");
  const [longestInformation, setLongestInformation] = useState("");
  const [longestInformationKey, setLongestInformationKey] = useState("");

  useEffect(() => {
    setDescription(information.description ?? "");
    setDetails(information.details ?? "");
    setCaution(information.caution ?? "");
    updateLongestInformation(description, details, caution);
  }, [information]);

  const updateLongestInformation = (desc: string, det: string, caut: string) => {
    const longest = findLongestDetails(desc, det, caut);
    setLongestInformationKey(longest[1]);
    setLongestInformation(longest[0]);
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>, field: string) => {
    const value = e.target.value;

    switch (field) {
      case "description":
        setDescription(value);
        onInformationChange({
          ...information,
          description: value,
        });
        break;
      case "details":
        setDetails(value);
        onInformationChange({
          ...information,
          details: value,
        });
        break;
      case "caution":
        setCaution(value);
        onInformationChange({
          ...information,
          caution: value,
        });
        break;
      default:
        break;
    }

    updateLongestInformation(
      field === "description" ? value : description,
      field === "details" ? value : details,
      field === "caution" ? value : caution,
    );

    onInformationChange({
      description: field === "description" ? value : description,
      details: field === "details" ? value : details,
      caution: field === "caution" ? value : caution,
      images: [],
    });
  };

  return (
    <div>
      <textarea
        data-testid="description-value"
        id={longestInformationKey}
        value={longestInformation.toString() || ""}
        onChange={e => handleChange(e, longestInformationKey)}
        className="appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
        rows={10}
      />
    </div>
  );
};

export default FormInformation;
