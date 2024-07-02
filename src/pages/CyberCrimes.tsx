import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import LoadingScreen from "../components/LoadingScreen";
import PaginationControls from "../components/PaginationControls";
import ImageCardList from "../components/ImageCardList";
import Modal from "../components/Modal";
import { wanted } from "../services/endpoints";
import { WantedPerson, PersonDetails } from "../services/types";
import { fetchWantedPersons } from "../services/fetchWantedPersons";
import { ITEMS_PER_PAGE } from "../services/constants";
import PageTitle from "../components/PageTitle";

const CyberCrimes = () => {
  const [activePerson, setActivePerson] = useState<WantedPerson | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [persons, setPersons] = useState<WantedPerson[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const subject = useLocation().pathname.replace("/", "");
  useEffect(() => {
    fetchWantedPersons(subject)
      .then((result: WantedPerson[]) => {
        setPersons(result);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div className="flex flex-row-reverse items-center justify-between px-[3rem]">
        <PaginationControls
          handlePrevPage={handlePrevPage}
          currentPage={currentPage}
          handleNextPage={handleNextPage}
          startIndex={startIndex}
          itemsPerPage={ITEMS_PER_PAGE}
          personsLength={persons.length}
        />
        <PageTitle category={subject} />
      </div>
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

export default CyberCrimes;
