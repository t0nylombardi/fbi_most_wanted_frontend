import { fetchData } from "./api";
import { User } from "./types";

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
      console.error("Login error:", error);
      return { success: false };
    }
  },
};
