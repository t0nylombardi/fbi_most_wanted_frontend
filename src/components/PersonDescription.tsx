import React from "react";
import { findLonestDetail } from "../utils/stringUtils";

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
  const longestDetail = findLonestDetail(description, details, caution);
  return (
    <div className="py-8">
      <div
        // Normally you shouldn't usedangerouslySetInnerHTML but, this html is comming from a safe api source
        dangerouslySetInnerHTML={{
          __html: longestDetail || "No description available",
        }}
        className="text-white w-full mb-10"
        data-testid="person-description"
        role="description"
      />
    </div>
  );
};

export default PersonDescription;
