import React from "react";

interface PageTitleProps {
  category: string;
}

const PageTitle = ({ category }: PageTitleProps) => {
  console.log("Rendering PageTitle: ", typeof category);
  const filterObj: { [key: string]: string } = {
    "": "Most Wanted",
    cyber: "Cyber's Most Wanted",
    "missing-persons": "Missing Persons",
    "violent-crime": "Violent Crimes",
  };

  return <h1 className="text-[3rem] text-chilean-fire-500">{filterObj[category]}</h1>;
};

export default PageTitle;
