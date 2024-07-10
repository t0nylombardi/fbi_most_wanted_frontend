import { userAuth } from "./endpoints";
export const login = async (username, password) => {
    const response = await userAuth.login(username, password);
    return response;
};
