import React from "react";

type ButtonProps = {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset"; // Add the type prop
};

const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <button
      className="w-full bg-gradient-to-tr from-chilean-fire-500 to-cedar-wood-finish-600 hover:bg-gradient-to-bl  text-white font-bold py-2 px-4 mt-4 mx-8"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
