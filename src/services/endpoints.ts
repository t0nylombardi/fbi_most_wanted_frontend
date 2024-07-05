import { fetchData } from "./api";
import { User } from "./types";

/**
 * This file is for defining specific endpoints and their interaction logic.
 *
 * User authentication service
 * @param username - The username of the user
 * @param password - The password of the user
 * @returns A promise that resolves to an object with a success boolean and a user object
 */
export const userAuth = {
  login: async (username: string, password: string): Promise<{ success: boolean; user?: User }> => {
    try {
      const response = await fetchData<User>("/user/auth", "POST", {
        username,
        password,
      });

      if (response.ok) {
        return { success: true, user: response.data }; // Assuming the API returns the user data
      } else {
        return { success: false };
      }
    } catch (error) {
      return { success: false };
    }
  },
};
