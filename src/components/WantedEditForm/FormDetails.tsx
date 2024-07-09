import React from "react";
import { PersonDetails } from "../../services/types";
import { capitalize, removeSeparator } from "../../utils/stringUtils";
import FormInformation from "./FormInformation";

type FormDetailsProps = {
  detailsObj: (keyof PersonDetails)[];
  details: PersonDetails;
  onDetailsChange: (updatedDetails: PersonDetails) => void;
};

const FormDetails: React.FC<FormDetailsProps> = ({ detailsObj, details, onDetailsChange }) => {
  const handleChange = (key: keyof PersonDetails, value: string) => {
    onDetailsChange({ ...details, [key]: value });
  };

  return (
    <div id="form-details" className="flex flex-wrap justify-start items-center gap-4">
      <table className="table-auto w-full">
        <tbody>
          {detailsObj.map((key: keyof PersonDetails) => (
            <tr key={key}>
              <td className="px-8">{capitalize(removeSeparator(key))}</td>
              <td className="px-8">
                <input
                  data-testid={`${key}-value`}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                  id={key as string}
                  type="text"
                  value={details[key]?.toString() || ""}
                  onChange={e => handleChange(key, e.target.value)}
                />
              </td>
            </tr>
          ))}
          <tr>
            <td className="px-8">Description</td>
            <td className="px-8">
              <FormInformation
                informationObj={detailsObj}
                information={details}
                onInformationChange={onDetailsChange}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FormDetails;
