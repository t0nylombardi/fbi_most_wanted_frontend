import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext } from "react";
import { AuthContext } from "../hooks/AuthContext";
import { splitArrayInHalf } from "../utils/arrayUtils";
import CheckBox from "../components/CheckBox";
const Profile = () => {
    const authContext = useContext(AuthContext);
    if (!authContext)
        return _jsx("div", { children: "Error: AuthContext not available" });
    const { user } = authContext;
    if (!user)
        return _jsx("div", { children: "Loading..." });
    const [firstHalf, secondHalf] = splitArrayInHalf(user.promises);
    return (_jsx("section", { className: "flex items-center justify-center my-12", children: _jsxs("header", { className: "text-white mx-[28rem]", children: [_jsx("h1", { className: "text-[3rem] py-12 text-chilean-fire-500", children: "Hi, I'm agent Rick Astley" }), _jsxs("div", { className: "flex flex-row align-center", children: [_jsx("img", { className: "rounded-full h-64 w-64 object-cover", src: user.image.default.toString(), alt: "My profile pic" }), _jsxs("div", { className: "flex flex-col px-12 justify-center align-middle", children: [_jsx("h2", { className: "text-[3rem] py-2", children: "_Things about me" }), _jsx("p", { className: "py-2 text-3xl text-chilean-fire-500", children: "I will never:" }), _jsxs("div", { className: "flex flex-row", children: [_jsx("div", { className: "flex flex-col mx-8", children: _jsx("ul", { className: "m-0 p-0 inline", children: firstHalf.map((promise, index) => (_jsx("li", { className: "text-2xl", children: _jsx(CheckBox, { text: promise }) }, index))) }) }), _jsx("div", { className: "flex flex-col mx-8", children: _jsx("ul", { className: "m-0 p-0 inline", children: secondHalf.map((promise, index) => (_jsx("li", { className: "text-2xl", children: _jsx(CheckBox, { text: promise }) }, index))) }) })] }), _jsx("div", { className: "flex flex-row justify-between py-12", children: _jsx("a", { href: user.website, className: "w-full bg-gradient-to-tr from-chilean-fire-500 to-cedar-wood-finish-600 hover:bg-gradient-to-bl  text-white font-bold py-2 px-4 mt-4 mx-8", target: "_blank", children: "Website" }) })] })] })] }) }));
};
export default Profile;
