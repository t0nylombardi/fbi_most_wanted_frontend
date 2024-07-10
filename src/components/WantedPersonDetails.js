import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { capitalize, removeSeparator } from "../utils/stringUtils";
/**
 * Converts height in inches to feet and inches.
 * @param {number} inches - The height in inches.
 * @returns {string} The height in feet and inches.
 */
export const convertHeightToFeet = (inches) => {
    if (inches === 0)
        return "";
    const feet = Math.floor(inches / 12);
    const remainingInches = inches % 12;
    return `${feet}ft ${remainingInches}in`;
};
/**
 * Converts weight into a string.
 * @param {number} weight - The weight in pounds.
 * @returns {string | null} The weight in pounds.
 */
export const convertWeight = (weight) => {
    if (weight === 0)
        return "";
    return `${weight} lbs`;
};
/**
 * Renders the details section of the wanted person card.
 * @param {WantedPersonDetailsProps} props - The wanted person object.
 * @returns {JSX.Element} The HTML structure for the details section.
 */
const WantedPersonDetails = ({ person }) => {
    const EmptyDetails = () => {
        return (_jsx("div", { className: "text-xl text-chilean-fire-500", children: "No Details are available for this person." }));
    };
    const detailsFromObj = [
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
        }
        else if (key === "weight_max" && typeof value === "number") {
            convertWeight(value);
        }
        return { [key]: value };
    })
        .reduce((acc, curr) => ({ ...acc, ...curr }), {});
    return Object.values(details).every(value => !value) ? (_jsx(EmptyDetails, {})) : (_jsx("table", { "data-testid": "detail-table", "aria-label": "details", id: "details", className: "table-fit w-full h-full text-xl text-chilean-fire-500", children: _jsx("tbody", { children: detailsFromObj.map(key => (_jsxs("tr", { children: [_jsx("td", { className: "px-8", children: capitalize(removeSeparator(key)) }), _jsx("td", { "data-testid": key, className: "px-8", children: capitalize(details[key]?.toString()) || "n/a" })] }, key))) }) }));
};
export default WantedPersonDetails;
