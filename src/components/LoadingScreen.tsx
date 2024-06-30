import React from "react";
import { loadingMessages } from "../services/constants";

const LoadingScreen = () => {
  const [loadingMessage, setLoadingMessage] = React.useState<string>(
    loadingMessages[Math.floor(Math.random() * loadingMessages.length)],
  );

  // load random loaddingMessage every 0.5 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * loadingMessages.length);
      setLoadingMessage(loadingMessages[randomIndex]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="">
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center justify-center">
          <p
            className="text-chilean-fire-500 text-4xl font-bold mt-4"
            data-testid="loading-message"
            role="status"
          >
            {loadingMessage}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
