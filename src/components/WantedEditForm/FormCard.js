import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import ImageCard from "../ImageCard";
import FormDetails from "./FormDetails";
import CTA from "../CTA";
const FormCard = ({ person, updatePersonDetails }) => {
    const [formDetails, setFormDetails] = useState({
        ...person,
        age_range: person.age_range?.toString() ?? "",
    });
    const handleDetailsChange = (updatedDetails) => {
        setFormDetails(prevDetails => ({
            ...prevDetails,
            ...updatedDetails,
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        updatePersonDetails(person.id, formDetails);
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
    return (_jsx("form", { onSubmit: handleSubmit, children: _jsxs("div", { className: "flex flex-col justify-center relative bg-gray-800 border border-cyprus-700 shadow-2xl rounded-2xl", children: [_jsxs("div", { className: "flex flex-row justify-around relative p-4 bg-gray-800 rounded-2xl w-[80rem]", children: [_jsx("button", { className: "absolute top-0 right-0 m-4 p-2 ", children: _jsx("span", { className: "bg-transparent text-chilean-fire-500 h-10 w-10 text-3xl block outline-none focus:outline-none", children: "\u00D7" }) }), _jsx(ImageCard, { image: person.images[0], caption: true }), _jsxs("div", { className: "flex flex-col justify-around w-full sm:w-[70%] md:w-[60%] lg:w-[50%]", children: [_jsx("h1", { className: "text-white font-bold text-3xl mt-6 mb-8", children: person.title }), _jsx(FormDetails, { detailsObj: detailsFromObj, details: formDetails, onDetailsChange: handleDetailsChange })] })] }), _jsxs("div", { className: "flex flex-row justify-center pb-8", children: [_jsx(CTA, { testId: "update-person-details", text: "Submit", type: "submit" }), _jsx(CTA, { text: "Cancel", onClick: () => { } })] })] }) }));
};
export default FormCard;
