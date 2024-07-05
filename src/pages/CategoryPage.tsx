import React, { useCallback, useState } from "react";
import {
  PageWrapper,
  LoadingScreen,
  PaginationControls,
  ImageCardList,
  PageTitle,
  ModalManager,
} from "../components";
import useFetchPersons from "../hooks/useFetchPersons";
import usePagination from "../hooks/usePagination";
import { WantedPerson } from "../services/types";
import { ITEMS_PER_PAGE } from "../services/constants";

interface CategoryPageProps {
  category: string;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ category }) => {
  const { persons, isLoading, error, setPersons } = useFetchPersons(category);
  const { currentPage, handleNextPage, handlePrevPage, startIndex, currentPersons } =
    usePagination(persons);

  const [activePerson, setActivePerson] = useState<WantedPerson | null>(null);

  const openModal = useCallback((person: WantedPerson) => {
    setActivePerson(person);
  }, []);

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
        <PageTitle category={category} />
      </div>
      <ImageCardList persons={currentPersons} openModal={openModal} />
      <ModalManager
        persons={persons}
        activePerson={activePerson}
        setActivePerson={setActivePerson}
        setPersons={setPersons}
      />
    </PageWrapper>
  );
};

export default CategoryPage;
