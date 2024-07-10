import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const PaginationControls = ({ handlePrevPage, currentPage, handleNextPage, startIndex, itemsPerPage, personsLength, }) => {
    return (_jsx("div", { className: "flex flex-row justify-end", children: _jsxs("div", { className: "pagination-controls", children: [_jsx("button", { onClick: handlePrevPage, disabled: currentPage === 1, className: "mx-2 p-2 border rounded disabled:opacity-50", children: "Previous" }), _jsx("span", { children: currentPage }), _jsx("button", { onClick: handleNextPage, disabled: startIndex + itemsPerPage >= personsLength, className: "mx-2 p-2 border rounded disabled:opacity-50", children: "Next" })] }) }));
};
export default PaginationControls;
