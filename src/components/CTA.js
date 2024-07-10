import { jsx as _jsx } from "react/jsx-runtime";
const CTA = ({ testId, text, onClick }) => {
    return (_jsx("button", { "data-testid": testId, className: "btn-cta", onClick: onClick, children: text }));
};
export default CTA;
