import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink } from "react-router-dom";
const ErrorPage = () => {
    return (_jsxs("main", { className: "h-screen w-full flex flex-col justify-center items-center bg-gray-800", children: [_jsx("h1", { className: "text-[12rem] font-extrabold text-white tracking-widest", children: "404" }), _jsx("div", { className: "bg-chilean-fire-500 text-gray-800 px-2 text-4xl rounded rotate-12 absolute", children: "Page Not Found" }), _jsx("button", { className: "mt-5", children: _jsxs("div", { className: "relative inline-block text-lg font-medium text-chilean-fire-500 group active:text-chilean-fire-600 focus:outline-none focus:ring", children: [_jsx("span", { className: "absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-chilean-fire-500 group-hover:translate-y-0 group-hover:translate-x-0" }), _jsx("span", { className: "relative block px-8 py-3 bg-gray-800 border border-current", children: _jsx(NavLink, { to: "/", children: "Go Home" }) })] }) })] }));
};
export default ErrorPage;
