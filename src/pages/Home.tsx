import React, { useState, useEffect, useCallback, useMemo } from "react";
import PageWrapper from "../components/PageWrapper";
import { wanted } from "../services/endpoints";
import ImageCardList from "../components/ImageCardList";
import Modal from "../components/Modal";
import LoadingScreen from "../components/LoadingScreen";
import PaginationControls from "../components/PaginationControls";
import { WantedPerson, PersonDetails } from "../services/types";

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
  const [persons, setPersons] = useState<WantedPerson[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // sleep for 2 seconds to simulate loading
        await new Promise(resolve => setTimeout(resolve, 1000));
        const result = await fetchWantedPersons();
        setPersons(result);
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const openModal = useCallback((person: WantedPerson) => {
    setActivePerson(person);
    setIsEditing(false);
  }, []);

  const closeModal = useCallback(() => {
    setActivePerson(null);
  }, []);

  const updatePersonDetails = useCallback(
    async (id: string, updatedDetails: Partial<PersonDetails>) => {
      setIsEditing(true);

      if (activePerson) {
        const convertedDetails: Partial<PersonDetails> = { ...updatedDetails };

        // Handle the conversion if necessary
        if (typeof updatedDetails.height_max === "string") {
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
    },
    [activePerson, persons, closeModal],
  );

  const removeWantedPerson = useCallback(
    async (id: string) => {
      await wanted.delete(id);
      // Refetch data or update cache manually
      const updatedPersons = persons.filter(person => person.id !== id);
      setPersons(updatedPersons);
      closeModal();
    },
    [persons, closeModal],
  );

  const handleNextPage = useCallback(() => {
    setCurrentPage(prevPage => prevPage + 1);
  }, []);

  const handlePrevPage = useCallback(() => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  }, []);

  const startIndex = useMemo(() => (currentPage - 1) * ITEMS_PER_PAGE, [currentPage]);
  const currentPersons = useMemo(
    () => (Array.isArray(persons) ? persons.slice(startIndex, startIndex + ITEMS_PER_PAGE) : []),
    [persons, startIndex],
  );

  if (isLoading) return <LoadingScreen />;
  if (error) return <div>{`Error: ${error.message}`}</div>;

  return (
    <PageWrapper>
      <PaginationControls
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
