import React from "react";
import CategoryPage from "./CategoryPage";

const Home: React.FC = () => {
  console.log("Env is", import.meta.env);
  return <CategoryPage category="wanted" />;
};

export default Home;
