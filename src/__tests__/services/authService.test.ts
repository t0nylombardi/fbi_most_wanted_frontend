import { login } from "../../services/authService";
import { userAuth } from "../../services/endpoints";

jest.mock("../../services/endpoints", () => ({
  userAuth: {
    login: jest.fn(),
  },
}));

describe("login", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mock calls before each test
  });

  it("should successfully log in with correct credentials", async () => {
    const username = "testuser";
    const password = "testpassword";

    // Mock successful response from userAuth.login
    const mockResponse = { token: "mock-token" };
    (userAuth.login as jest.Mock).mockResolvedValue(mockResponse);

    // Call login function
    const response = await login(username, password);

    // Assertions
    expect(userAuth.login).toHaveBeenCalledWith(username, password);
    expect(response).toEqual(mockResponse);
  });

  it("should handle login failure with incorrect credentials", async () => {
    const username = "testuser";
    const password = "invalidpassword";

    // Mock failed response from userAuth.login
    const errorMessage = "Invalid credentials";
    (userAuth.login as jest.Mock).mockRejectedValue(new Error(errorMessage));

    // Call login function
    try {
      await login(username, password);
      // If login succeeds unexpectedly
      fail("Expected login to fail with an error");
    } catch (error: unknown) {
      if (!(error instanceof Error)) {
        throw new Error("Expected error to be an instance of Error");
      }
      // Assertions
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe(errorMessage);
    }
  });

  // Add more test cases as needed for edge cases, network errors, etc.
});
