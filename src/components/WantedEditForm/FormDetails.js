import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { capitalize, removeSeparator } from "../../utils/stringUtils";
import FormInformation from "./FormInformation";
const FormDetails = ({ detailsObj, details, onDetailsChange }) => {
    const handleChange = (key, value) => {
        onDetailsChange({ ...details, [key]: value });
    };
    const handleImageChange = (url) => {
        const updatedImages = [...details.images];
        updatedImages[0] = { ...updatedImages[0], large: url };
        onDetailsChange({ ...details, images: updatedImages });
    };
    return (_jsx("div", { id: "form-details", className: "flex flex-wrap justify-start items-center gap-4", children: _jsx("table", { className: "table-auto w-full", children: _jsxs("tbody", { children: [detailsObj.map((key) => (_jsxs("tr", { children: [_jsx("td", { className: "px-8", children: capitalize(removeSeparator(key)) }), _jsx("td", { className: "px-8", children: _jsx("input", { "data-testid": `${key}-value`, className: "appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline", id: key, type: "text", value: details[key]?.toString() || "", onChange: e => handleChange(key, e.target.value) }) })] }, key))), _jsxs("tr", { children: [_jsx("td", { className: "px-8", children: "Image Url" }), _jsx("td", { className: "px-8", children: _jsx("input", { "data-testid": "image-url-value", className: "appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline", id: "image-url", type: "text", defaultValue: details.images[0]?.large || "", onChange: e => handleImageChange(e.target.value) }) })] }), _jsxs("tr", { children: [_jsx("td", { className: "px-8", children: "Description" }), _jsx("td", { className: "px-8", children: _jsx(FormInformation, { informationObj: detailsObj, information: details, onInformationChange: onDetailsChange }) })] })] }) }) }));
};
export default FormDetails;
