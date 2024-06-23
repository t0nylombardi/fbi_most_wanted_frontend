import React, { useEffect, useState } from "react";
import { WantedPerson } from "../services/types";
import PageWrapper from "../components/PageWrapper";
import { tenMostWanted } from "../services/endpoints";
import ImageCardList from "../components/ImageCardList";
import Modal from "../components/Modal";

const TopTen = () => {
  const [persons, setPersons] = useState<WantedPerson[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activePerson, setActivePerson] = useState<WantedPerson | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await tenMostWanted.read();
        setPersons(result);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };
    getData();
  }, []);

  const openModal = (person: WantedPerson) => {
    setActivePerson(person);
  };

  const closeModal = () => {
    setActivePerson(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <PageWrapper>
      <h1 className="mx-[1rem] px-[1rem] text-[3.25rem] text-chilean-fire-500 uppercase">
        Top Ten Most Wanted
      </h1>
      <ImageCardList persons={persons} openModal={openModal} />
      {activePerson && <Modal person={activePerson} closeModal={closeModal} />}
    </PageWrapper>
  );
};

export default TopTen;
