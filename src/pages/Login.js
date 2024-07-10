import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useAuth } from "../hooks/AuthContext";
const Login = () => {
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleLogin = (e) => {
        e.preventDefault();
        login(formData.username, formData.password);
    };
    return (_jsxs("div", { className: "flex min-h-full flex-col justify-center px-6 py-12 lg:px-8", children: [_jsx("div", { children: _jsx("h2", { className: "mt-10 text-center text-6xl font-bold leading-9 tracking-tight text-jungle-green-500", children: "Sign in to your account" }) }), _jsxs("div", { className: "mt-20 sm:mx-auto sm:w-full sm:max-w-sm", children: [_jsxs("form", { className: "space-y-6", onSubmit: handleLogin, children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "username", className: "block text-2xl font-medium leading-6 text-jungle-green-500", children: "Username" }), _jsx("div", { className: "mt-2", children: _jsx("input", { id: "username", name: "username", type: "text", className: "block w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6", onChange: handleChange, value: formData.username, autoComplete: "username", placeholder: "rickastley" }) })] }), _jsxs("div", { children: [_jsx("div", { className: "flex items-center justify-between", children: _jsx("label", { htmlFor: "password", className: "block text-2xl font-medium leading-6 text-jungle-green-500", children: "Password" }) }), _jsx("div", { className: "mt-2", children: _jsx("input", { id: "password", name: "password", type: "password", className: "block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6", onChange: handleChange, value: formData.password, autoComplete: "current-password", placeholder: "nevergonnagiveyouup" }) })] }), _jsx("div", { className: "flex justify-center w-full shadow-sm ", children: _jsx("button", { type: "submit", className: "btnw-full bg-gradient-to-tr from-chilean-fire-500 to-cedar-wood-finish-600 hover:bg-gradient-to-bl  text-white font-bold py-2 px-4 mt-4 mx-8", children: "Login" }) })] }), _jsxs("div", { className: "flex flex-col justify-center item-center mt-6 text-lg font-medium leading-6 text-gray-500", children: [_jsx("p", { className: "flex justify-center pt-4", children: "Demo credentials" }), _jsxs("div", { className: "flex flex-row", children: [_jsx("p", { className: "p-4", children: "Username:" }), _jsx("p", { className: "p-4 text-chilean-fire-500/80", children: "rickastley" })] }), _jsxs("div", { className: "flex flex-row", children: [_jsx("p", { className: "p-4", children: "Password:" }), _jsx("p", { className: "p-4 text-chilean-fire-500/80", children: "nevergonnagiveyouup" })] })] })] })] }));
};
export default Login;
