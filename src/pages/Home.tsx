import React, { useState } from "react";
import { useQuery } from "react-query";
import { WantedPerson } from "../services/types";
import PageWrapper from "../components/PageWrapper";
import { wanted } from "../services/endpoints";
import ImageCardList from "../components/ImageCardList";
import Modal from "../components/Modal";
import LoadingScreen from "../components/LoadingScreen";
import PaginationControlls from "../components/PaginationControlls";

const ITEMS_PER_PAGE = 20;

const fetchWantedPersons = async () => {
  const result = await wanted.read();
  result.sort((a, b) => {
    const dateA = new Date(String(a.modified)).getTime();
    const dateB = new Date(String(b.modified)).getTime();
    return dateA - dateB;
  });
  return result;
};

const Home: React.FC = () => {
  const [activePerson, setActivePerson] = useState<WantedPerson | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const {
    data: persons = [],
    isLoading = true,
    error,
  } = useQuery<WantedPerson[]>(
    "wantedPersons",
    fetchWantedPersons,
    { staleTime: 3600 * 1000 }, // 1 hour
  );

  const openModal = (person: WantedPerson) => {
    setActivePerson(person);
    setIsEditing(false);
  };

  const closeModal = () => {
    setActivePerson(null);
  };

  const editWantedPerson = (id: string) => {
    console.log("Editing person with id: ", id);
    setIsEditing(true);
  };

  const removeWantedPerson = async (id: string) => {
    await wanted.delete(id);
    // Refetch data or update cache manually
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPersons = persons.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (isLoading) return <LoadingScreen />;
  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <PageWrapper>
      <PaginationControlls
        handlePrevPage={handlePrevPage}
        currentPage={currentPage}
        handleNextPage={handleNextPage}
        startIndex={startIndex}
        itemsPerPage={ITEMS_PER_PAGE}
        personsLength={persons.length}
      />
      <>
        <ImageCardList persons={currentPersons} openModal={openModal} />
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
