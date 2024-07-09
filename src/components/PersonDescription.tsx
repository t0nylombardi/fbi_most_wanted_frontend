import React from "react";
import { findLongestDetails } from "../utils/stringUtils";

interface PersonDescriptionProps {
  description: string | null;
  details: string | null;
  caution: string | null;
}

interface PersonDescriptionProps {
  description: string | null;
  details: string | null;
  caution: string | null;
}

const PersonDescription = ({ description, details, caution }: PersonDescriptionProps) => {
  const longestDetail = findLongestDetails(description, details, caution);
  return (
    <div className="py-8">
      <div
        dangerouslySetInnerHTML={{
          __html: longestDetail[0] || "No description available",
        }}
        className="text-white w-full mb-10"
        data-testid="person-description"
        role="description"
      />
    </div>
  );
};

export default PersonDescription;
