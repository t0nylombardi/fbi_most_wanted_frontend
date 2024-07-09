import "@testing-library/jest-dom";
import fetchMock, { FetchMock } from "jest-fetch-mock";

(global.fetch as FetchMock) = fetchMock;
fetchMock.enableMocks();
