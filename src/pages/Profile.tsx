import React from "react";
import { useAuth } from "../hooks/AuthContext";
import { PageWrapper } from "../components";

const Profile = () => {
  console.log("Profile");
  const { isLoggedIn, user } = useAuth();

  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold text-jungle-green-500">Profile</h1>
        <div className="mt-4">
          {isLoggedIn ? (
            <div>
              <p className="text-lg font-semibold text-jungle-green-500">
                Welcome {user?.username}
              </p>
              <div
                // Normally you shouldn't usedangerouslySetInnerHTML but, this html is comming from a safe api source
                dangerouslySetInnerHTML={{ __html: user?.description || "" }}
                className="text-white w-full mb-10"
                data-testid="person-description"
                role="description"
              />
            </div>
          ) : (
            <p className="text-lg font-semibold text-jungle-green-500">You are not logged in</p>
          )}
        </div>
      </div>
    </PageWrapper>
  );
};

export default Profile;
