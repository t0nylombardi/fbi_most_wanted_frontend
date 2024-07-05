import { userAuth } from "../../services/endpoints";
import { fetchData } from "../../services/api";
import mockUser from "../../__mocks__/mockUser";

jest.mock("../../services/api");

describe("userAuth service", () => {
  it("should return success true and user data on successful login", async () => {
    (fetchData as jest.Mock).mockResolvedValue({ ok: true, data: mockUser });

    const response = await userAuth.login("testuser", "password");

    expect(fetchData).toHaveBeenCalledWith("/user/auth", "POST", {
      username: "testuser",
      password: "password",
    });
    expect(response).toEqual({ success: true, user: mockUser });
  });

  it("should return success false on login failure", async () => {
    (fetchData as jest.Mock).mockResolvedValue({ ok: false });

    const response = await userAuth.login("testuser", "wrongpassword");

    expect(fetchData).toHaveBeenCalledWith("/user/auth", "POST", {
      username: "testuser",
      password: "wrongpassword",
    });
    expect(response).toEqual({ success: false });
  });

  it("should handle exceptions and return success false", async () => {
    (fetchData as jest.Mock).mockRejectedValue(new Error("Network error"));

    const response = await userAuth.login("testuser", "password");

    expect(fetchData).toHaveBeenCalledWith("/user/auth", "POST", {
      username: "testuser",
      password: "password",
    });
    expect(response).toEqual({ success: false });
  });
});
