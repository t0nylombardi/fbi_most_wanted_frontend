import React, { useEffect, useState } from "react";
import { WantedPerson } from "../services/types";
import PageWrapper from "../components/PageWrapper";
import { wanted } from "../services/endpoints";

const SubjectsList = () => {
  const [subjects, setSubjects] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result: WantedPerson[] = await wanted.read();
        const uniqueSubjects = Array.from(
          new Set(result.flatMap(person => person.subjects)),
        ).sort();
        setSubjects(uniqueSubjects as string[]);
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

  const uuid = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  return (
    <PageWrapper>
      <h1 className="mx-[1rem] px-[1rem] text-[3.25rem] text-chilean-fire-500 uppercase">
        Unique Subjects
      </h1>
      <ul className="list-disc ml-[2rem] text-white">
        {subjects.map(subject => (
          <li key={uuid()}>{subject}</li>
        ))}
      </ul>
    </PageWrapper>
  );
};

export default SubjectsList;
