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
  const [isEditing, setIsEditing] = useState<boolean>(false);

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
    setIsEditing(false);
  };

  const closeModal = () => {
    setActivePerson(null);
  };

  const editWantedPerson = (id: string) => {
    console.log("Edit person with id: ", id);
    setIsEditing(true);
  };

  const removeWantedPerson = async (id: string) => {
    await tenMostWanted.delete(id);
    const updatedPersons = persons.filter(person => person.id !== id);
    setPersons(updatedPersons);
    closeModal();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <PageWrapper>
      <h1 className="mx-[1rem] px-[1rem] text-[3.25rem] text-chilean-fire-500 uppercase">
        Top Ten Most Wanted
      </h1>

      <>
        <ImageCardList persons={persons} openModal={openModal} />
        {activePerson && (
          <Modal
            person={activePerson}
            closeModal={closeModal}
            isEditing={isEditing}
            editWantedPerson={() => editWantedPerson(activePerson.id)}
            removeWantedPerson={() => removeWantedPerson(activePerson.id)}
          />
        )}
      </>
    </PageWrapper>
  );
};

export default TopTen;
