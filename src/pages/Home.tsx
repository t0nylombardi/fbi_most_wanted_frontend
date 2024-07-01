import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { WantedPerson, PersonDetails } from "../services/types";
import PageWrapper from "../components/PageWrapper";
import { wanted } from "../services/endpoints";
import ImageCardList from "../components/ImageCardList";
import Modal from "../components/Modal";
import LoadingScreen from "../components/LoadingScreen";
import PaginationControlls from "../components/PaginationControlls";

const ITEMS_PER_PAGE = 20;

const fetchWantedPersons = async () => {
  try {
    const result = await wanted.read();
    result.sort((a, b) => {
      const dateA = new Date(String(a.modified)).getTime();
      const dateB = new Date(String(b.modified)).getTime();
      return dateA - dateB;
    });
    return result;
  } catch (error) {
    throw new Error("Failed to fetch wanted persons");
  }
};

const Home: React.FC = () => {
  const [activePerson, setActivePerson] = useState<WantedPerson | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const {
    data: persons = [],
    isLoading = true,
    error,
  } = useQuery<WantedPerson[], Error>({
    queryKey: ["wantedPersons"],
    queryFn: fetchWantedPersons,
    retry: false,
  });

  const openModal = (person: WantedPerson) => {
    setActivePerson(person);
    setIsEditing(false);
  };

  const closeModal = () => {
    setActivePerson(null);
  };

  const updatePersonDetails = async (id: string, updatedDetails: Partial<PersonDetails>) => {
    console.log("Update person details...");
    setIsEditing(true);

    if (activePerson) {
      const convertedDetails: Partial<PersonDetails> = { ...updatedDetails };

      // Handle the conversion if necessary
      if (updatedDetails.height_max === "string") {
        const heightMatch = updatedDetails.height_max.match(/(\d+)ft (\d+)in/);
        if (heightMatch) {
          const feet = parseInt(heightMatch[1], 10);
          const inches = parseInt(heightMatch[2], 10);
          convertedDetails.height_max = feet * 12 + inches;
        } else {
          convertedDetails.height_max = null; // Handle invalid input gracefully
        }
      }

      const result = await wanted.update(id, convertedDetails);
      // Update the cache manually
      const updatedPersonIndex = persons.findIndex(person => person.id === activePerson.id);
      persons[updatedPersonIndex] = result;
      setActivePerson(result);
      closeModal();
    }
  };

  const removeWantedPerson = async (id: string) => {
    await wanted.delete(id);
    // Refetch data or update cache manually
    persons.splice(
      persons.findIndex(person => person.id === id),
      1,
    );
    closeModal();
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
  if (error) return <div>{error.message}</div>;

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
            editPersonDetails={() => setIsEditing(true)}
            removeWantedPerson={() => removeWantedPerson(activePerson.id)}
            updatePersonDetails={updatePersonDetails}
          />
        )}
      </>
    </PageWrapper>
  );
};

export default Home;
