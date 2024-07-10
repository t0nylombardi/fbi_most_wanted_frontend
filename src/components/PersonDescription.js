import { jsx as _jsx } from "react/jsx-runtime";
import { findLongestDetails } from "../utils/stringUtils";
const PersonDescription = ({ description, details, caution }) => {
    const longestDetail = findLongestDetails(description, details, caution);
    return (_jsx("div", { className: "py-8", children: _jsx("div", { dangerouslySetInnerHTML: {
                __html: longestDetail[0] || "No description available",
            }, className: "text-white w-full mb-10", "data-testid": "person-description", role: "description" }) }));
};
export default PersonDescription;
