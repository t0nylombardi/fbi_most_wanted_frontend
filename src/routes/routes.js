import { jsx as _jsx } from "react/jsx-runtime";
import App from "../App";
import { Home, CyberCrimes, MissingPersons, ViolentCrimes, ErrorPage, Login, Profile, } from "../pages";
const routes = [
    {
        path: "/",
        element: _jsx(App, {}),
        errorElement: _jsx(ErrorPage, {}),
        children: [
            { path: "/", element: _jsx(Home, {}) },
            { path: "/cyber", element: _jsx(CyberCrimes, {}) },
            { path: "/missing-persons", element: _jsx(MissingPersons, {}) },
            { path: "/violent-crimes", element: _jsx(ViolentCrimes, {}) },
            { path: "/login", element: _jsx(Login, {}) },
            { path: "/profile", element: _jsx(Profile, {}) },
        ],
    },
];
export default routes;
