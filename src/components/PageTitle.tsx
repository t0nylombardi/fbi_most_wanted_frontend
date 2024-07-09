import React from "react";

interface PageTitleProps {
  category: string;
}

const PageTitle = ({ category }: PageTitleProps) => {
  const filterObj: { [key: string]: string } = {
    wanted: "All Wanted",
    "cyber-crimes": "Cyber Crimes",
    "missing-persons": "Missing Persons",
    "violent-crimes": "Violent Crimes",
  };

  return <h1 className="text-2xl text-chilean-fire-500">{filterObj[category]}</h1>;
};

export default PageTitle;
