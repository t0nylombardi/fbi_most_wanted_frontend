import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { loadingMessages } from "../services/constants";
const LoadingScreen = () => {
    const [loadingMessage, setLoadingMessage] = React.useState(loadingMessages[Math.floor(Math.random() * loadingMessages.length)]);
    React.useEffect(() => {
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * loadingMessages.length);
            setLoadingMessage(loadingMessages[randomIndex]);
        }, 2000);
        return () => clearInterval(interval);
    }, []);
    return (_jsx("div", { className: "", children: _jsx("div", { className: "flex items-center justify-center h-screen", children: _jsx("div", { className: "flex flex-col items-center justify-center", children: _jsx("p", { className: "text-chilean-fire-500 text-4xl font-bold mt-4", "data-testid": "loading-message", role: "status", children: loadingMessage }) }) }) }));
};
export default LoadingScreen;
