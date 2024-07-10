import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink } from "react-router-dom";
const NavBar = ({ logout, isLoggedIn, user }) => {
    const links = [
        { title: "All Wanted", url: "/" },
        { title: "Cyber Crimes", url: "/cyber" },
        { title: "Missing Persons", url: "/missing-persons" },
        { title: "Violent Crims", url: "/violent-crimes" },
    ];
    return (_jsx("header", { children: _jsx("nav", { role: "navbar", children: _jsxs("div", { className: "flex flex-row items-center justify-around py-4 px-2", children: [_jsx("div", { className: "w-1/2", children: _jsx("h1", { className: "text-3xl", children: _jsx("a", { role: "home", href: "/", className: "hover:text-cedar-wood-finish-400", children: "FBI WANTED" }) }) }), _jsx("div", { className: "w-full md:block md:w-auto", id: "navbar-default", children: _jsx("ul", { className: "font-medium flex flex-col justify-center p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-2 rtl:space-x-reverse md:mt-0 md:border-0", children: links.map((link, index) => (_jsx("li", { className: "p-0 m-0", children: _jsx(NavLink, { to: link.url, className: ({ isActive, isPending }) => [isPending ? "btn-pending" : "", isActive ? "btn-active" : "btn"].join(" "), children: link.title }) }, index))) }) }), _jsx("div", { className: "flex justify-end items-center", children: isLoggedIn ? (_jsxs(_Fragment, { children: [_jsx("div", { children: _jsx(NavLink, { to: "/profile", className: "relative flex items-center justify-center w-8 h-8 overflow-hidden rounded-full", id: "user-profile-button", children: _jsx("img", { "data-testid": "user-image", role: "img", className: "h-[2rem] w-[2rem] rounded-full bg-cover bg-center", src: user?.image.default, alt: "" }) }) }), _jsx("button", { className: "btn", onClick: logout, children: "Logout" })] })) : ("") })] }) }) }));
};
export default NavBar;
