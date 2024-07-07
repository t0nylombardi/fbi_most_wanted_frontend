import React from "react";

type ButtonProps = {
  text: string;
  onClick?: () => void;
  testId?: string;
  type?: "button" | "submit" | "reset";
};

const CTA = ({ testId, text, onClick }: ButtonProps) => {
  return (
    <button data-testid={testId} className="btn-cta" onClick={onClick}>
      {text}
    </button>
  );
};

export default CTA;
