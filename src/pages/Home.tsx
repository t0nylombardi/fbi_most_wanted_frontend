import React, { useEffect, useState } from "react";
import { caseOfTheWeek } from "../services/endpoints";
import { WantedPerson } from "../services/types";
import PageWrapper from "../components/PageWrapper";
import WantedPersonDetails from "../components/WantedPersonDetails";
import ImageCard from "../components/ImageCard";

const Home: React.FC = () => {
  const [data, setData] = useState<WantedPerson[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await caseOfTheWeek.read();
        setData(result);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // load first wanted person
  const wantedPerson = data[0];
  return (
    <PageWrapper>
      <div id="container" className="p-20 w-auto flex px-24 justify-center relative">
        {/*
          Main wanted person card padding}
          px-4 sm:px-8 md:px-24 lg:px-24 xl:px-[3rem] px-4 sm:px-8 md:px-24 lg:px-24 xl:px-[3rem]
        */}
        <div
          id="container"
          className="p-20 w-full flex flex-row justify-around relative shadow-2xl"
        >
          <ImageCard image={wantedPerson.images[0]} />
          <div className="w-full sm:w-[70%] md:w-[60%] lg:w-[50%]">
            <h1 className="text-white font-bold text-3xl mt-6 mb-8">{wantedPerson.title}</h1>
            <p className="text-white w-full sm:w-[35rem] md:w-[30rem] lg:w-[25rem] mb-10">
              {wantedPerson.description}
            </p>
            <div id="details" className="flex flex-wrap justify-start items-center gap-4">
              <WantedPersonDetails person={wantedPerson} />
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Home;
