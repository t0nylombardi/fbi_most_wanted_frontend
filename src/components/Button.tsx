import React from "react";

const Button = ({ text }: { text: string }) => {
  return (
    <button className="w-full bg-gradient-to-tr from-chilean-fire-500 to-cedar-wood-finish-600 hover:bg-gradient-to-bl  text-white font-bold py-2 px-4 mt-4 mx-8">
      {text}
    </button>
  );
};

export default Button;
