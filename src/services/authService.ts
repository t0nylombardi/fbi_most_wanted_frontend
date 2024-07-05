import { userAuth } from "./endpoints";

export const login = async (username: string, password: string) => {
  const response = await userAuth.login(username, password);
  return response;
};
