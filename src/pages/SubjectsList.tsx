import React, { useEffect, useState } from "react";
import { WantedPerson } from "../services/types";
import PageWrapper from "../components/PageWrapper";
import { wanted } from "../services/endpoints";

interface SubjectCount {
  subject: string;
  count: number;
}

const SubjectsList = () => {
  const [subjects, setSubjects] = useState<SubjectCount[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result: WantedPerson[] = await wanted.read();
        const subjectCounts: { [key: string]: number } = {};

        result.forEach(person => {
          person.subjects.forEach(subject => {
            subjectCounts[subject] = (subjectCounts[subject] || 0) + 1;
          });
        });

        const uniqueSubjects = Object.entries(subjectCounts)
          .map(([subject, count]) => ({ subject, count }))
          .sort((a, b) => b.count - a.count); // Sort by count in descending order

        setSubjects(uniqueSubjects);
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
        {subjects.map(({ subject, count }) => (
          <li key={uuid()}>
            {subject} - {count}
          </li>
        ))}
      </ul>
    </PageWrapper>
  );
};

export default SubjectsList;
