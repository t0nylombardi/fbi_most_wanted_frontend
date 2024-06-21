import React, { useEffect, useState } from "react";
import { caseOfTheWeek } from "../services/endpoints";
import { WantedPerson } from "../services/types";
import PageWrapper from "../components/PageWrapper";
import SinglePersonCard from "../components/SinglePersonCard";

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
      <h1 className="mx-[6rem] px-[3.9rem] text-4xl text-chilean-fire-500 ">CASE OF THE WEEK</h1>
      <SinglePersonCard person={wantedPerson} />
    </PageWrapper>
  );
};

export default Home;
