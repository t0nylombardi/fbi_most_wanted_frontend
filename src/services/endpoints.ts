import { fetchData } from "./api";
import { User } from "./types";

export const userAuth = {
  login: async (
    username: string,
    password: string,
  ): Promise<{ success: boolean; token?: string }> => {
    try {
      const response = await fetchData<User>("/user/auth", "POST", {
        username,
        password,
      });

      if (response.ok) {
        return { success: true, token: response.data.token }; // Assuming the API returns a token
      } else {
        return { success: false };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false };
    }
  },
};
