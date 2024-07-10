import { login } from "../../services/authService";
import { userAuth } from "../../services/endpoints";
jest.mock("../../services/endpoints", () => ({
    userAuth: {
        login: jest.fn(),
    },
}));
describe("login", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("should successfully log in with correct credentials", async () => {
        const username = "testuser";
        const password = "testpassword";
        const mockResponse = { token: "mock-token" };
        userAuth.login.mockResolvedValue(mockResponse);
        const response = await login(username, password);
        expect(userAuth.login).toHaveBeenCalledWith(username, password);
        expect(response).toEqual(mockResponse);
    });
    it("should handle login failure with incorrect credentials", async () => {
        const username = "testuser";
        const password = "invalidpassword";
        const errorMessage = "Invalid credentials";
        userAuth.login.mockRejectedValue(new Error(errorMessage));
        try {
            await login(username, password);
            fail("Expected login to fail with an error");
        }
        catch (error) {
            if (!(error instanceof Error)) {
                throw new Error("Expected error to be an instance of Error");
            }
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe(errorMessage);
        }
    });
});
