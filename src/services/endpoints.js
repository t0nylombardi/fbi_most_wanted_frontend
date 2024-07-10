import { fetchData } from "./api";
/**
 * This file is for defining specific endpoints and their interaction logic.
 *
 * User authentication service
 * @param username - The username of the user
 * @param password - The password of the user
 * @returns A promise that resolves to an object with a success boolean and a user object
 */
export const userAuth = {
    login: async (username, password) => {
        try {
            const response = await fetchData("/user/auth", "POST", {
                username,
                password,
            });
            if (response.ok) {
                return { success: true, user: response.data };
            }
            else {
                return { success: false };
            }
        }
        catch (error) {
            return { success: false };
        }
    },
};
