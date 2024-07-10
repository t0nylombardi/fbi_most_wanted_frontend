import { jsx as _jsx } from "react/jsx-runtime";
const PageTitle = ({ category }) => {
    const filterObj = {
        wanted: "All Wanted",
        "cyber-crimes": "Cyber Crimes",
        "missing-persons": "Missing Persons",
        "violent-crimes": "Violent Crimes",
    };
    return _jsx("h1", { className: "text-2xl text-chilean-fire-500", children: filterObj[category] });
};
export default PageTitle;
