import React, { useContext } from "react";
import { AuthContext } from "../hooks/AuthContext";
import { splitArrayInHalf } from "../utils/arrayUtils";
import CheckBox from "../components/CheckBox";

const Profile = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) return <div>Error: AuthContext not available</div>;

  const { user } = authContext;
  if (!user) return <div>Loading...</div>;

  const [firstHalf, secondHalf] = splitArrayInHalf(user.promises);

  return (
    <section className="flex items-center justify-center my-12">
      <header className="text-white mx-[28rem]">
        <h1 className="text-[3rem] py-12 text-chilean-fire-500">Hi, I'm agent Rick Astley</h1>
        <div className="flex flex-row align-center">
          <img
            className="rounded-full h-64 w-64 object-cover"
            src={user.image.default.toString()}
            alt="My profile pic"
          />
          <div className="flex flex-col px-12 justify-center align-middle">
            <h2 className="text-[3rem] py-2">_Things about me</h2>
            <p className="py-2 text-3xl text-chilean-fire-500">I will never:</p>
            <div className="flex flex-row">
              <div className="flex flex-col mx-8">
                <ul className="m-0 p-0 inline">
                  {firstHalf.map((promise, index) => (
                    <li key={index} className="text-2xl">
                      <CheckBox text={promise} />
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col mx-8">
                <ul className="m-0 p-0 inline">
                  {secondHalf.map((promise, index) => (
                    <li key={index} className="text-2xl">
                      <CheckBox text={promise} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-row justify-between py-12">
              <a
                href={user.website}
                className="w-full bg-gradient-to-tr from-chilean-fire-500 to-cedar-wood-finish-600 hover:bg-gradient-to-bl  text-white font-bold py-2 px-4 mt-4 mx-8"
                target="_blank"
              >
                Website
              </a>
            </div>
          </div>
        </div>
      </header>
    </section>
  );
};

export default Profile;
