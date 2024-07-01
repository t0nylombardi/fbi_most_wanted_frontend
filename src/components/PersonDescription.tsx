import React from "react";

interface PersonDescriptionProps {
  description: string | null;
  details: string | null;
}

const PersonDescription = ({ description, details }: PersonDescriptionProps) => {
  return (
    <div className="py-8">
      <div
        // Normally you shouldn't usedangerouslySetInnerHTML but, this html is comming from a safe api source
        dangerouslySetInnerHTML={{ __html: description || details || "No description available" }}
        className="text-white w-full mb-10"
        data-testid="person-description"
        role="description"
      />
    </div>
  );
};

export default PersonDescription;
