import React, { useEffect, useState } from "react";
import { WantedPerson } from "../services/types";
import PageWrapper from "../components/PageWrapper";
import { wanted } from "../services/endpoints";
import ImageCardList from "../components/ImageCardList";
import Modal from "../components/Modal";

const Home: React.FC = () => {
  const [persons, setPersons] = useState<WantedPerson[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activePerson, setActivePerson] = useState<WantedPerson | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await wanted.read();
        // filter modified date by oldest to newest
        result.sort((a, b) => {
          const dateA = new Date(String(a.modified)).getTime();
          const dateB = new Date(String(b.modified)).getTime();
          return dateA - dateB;
        });
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
    await wanted.delete(id);
    const updatedPersons = persons.filter(person => person.id !== id);
    setPersons(updatedPersons);
    closeModal();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <PageWrapper>
      <h1 className="mx-[6rem] px-[3.9rem] text-4xl text-chilean-fire-500 ">CASE OF THE WEEK</h1>
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

export default Home;
