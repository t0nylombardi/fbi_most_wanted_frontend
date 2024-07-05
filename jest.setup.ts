import "@testing-library/jest-dom";
import fetchMock, { FetchMock } from "jest-fetch-mock";

// Mocking global.fetch
(global.fetch as FetchMock) = fetchMock;
fetchMock.enableMocks();
