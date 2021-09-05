import axios from "axios";
import { Api, createApiService } from "./createApiService";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

let api: Api;

type MockData = {
  test: boolean;
  value: string;
};

beforeEach(() => {
  api = createApiService("test-url.com");
});

it("should create proper api object", () => {
  expect(api.get).toBeInstanceOf(Function);
  expect(api.post).toBeInstanceOf(Function);
});

it("should send get request and retrieve data", async () => {
  mockedAxios.get.mockImplementation((url: string) =>
    Promise.resolve({
      data: {
        test: true,
        value: "get-test",
      },
    })
  );

  const data = await api.get<MockData>("/get-endpoint");

  expect(data).toStrictEqual({
    test: true,
    value: "get-test",
  });

  expect(mockedAxios.get).toBeCalledWith("test-url.com/get-endpoint");
});

it("should send post request with data", async () => {
  mockedAxios.post.mockImplementation((url: string, data: MockData) =>
    Promise.resolve({ data })
  );

  const data: MockData = {
    test: true,
    value: "post-test",
  };

  const responseData = await api.post<MockData>("/post-endpoint", data);

  expect(responseData).toStrictEqual(data);

  expect(mockedAxios.post).toBeCalledWith("test-url.com/post-endpoint", data);
});
