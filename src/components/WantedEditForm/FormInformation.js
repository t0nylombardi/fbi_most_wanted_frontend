import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { findLongestDetails } from "../../utils/stringUtils";
const FormInformation = ({ informationObj, information, onInformationChange, }) => {
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
    const updateLongestInformation = (desc, det, caut) => {
        const longest = findLongestDetails(desc, det, caut);
        setLongestInformationKey(longest[1]);
        setLongestInformation(longest[0]);
    };
    const handleChange = (e, field) => {
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
        updateLongestInformation(field === "description" ? value : description, field === "details" ? value : details, field === "caution" ? value : caution);
        onInformationChange({
            description: field === "description" ? value : description,
            details: field === "details" ? value : details,
            caution: field === "caution" ? value : caution,
            images: [],
        });
    };
    return (_jsx("div", { children: _jsx("textarea", { "data-testid": "description-value", id: longestInformationKey, value: longestInformation.toString() || "", onChange: e => handleChange(e, longestInformationKey), className: "appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline", rows: 10 }) }));
};
export default FormInformation;
