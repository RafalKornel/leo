import { rest } from "msw";
import { setupServer } from "msw/node";

import { Api, createApiService } from "./createApiService";

let api: Api;

type MockData = {
  test: boolean;
  value: string;
};

const getData: MockData = {
  test: true,
  value: "get-test",
};

const postData: MockData = {
  test: true,
  value: "post-test",
};

const handlers = [
  rest.get("http://test-url.com/get-endpoint", (req, res, ctx) => {
    return res(ctx.json(getData));
  }),
  rest.post("http://test-url.com/post-endpoint", (req, res, ctx) => {
    return res(ctx.json(req.body));
  }),
];

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
  api = createApiService("http://test-url.com");
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it("should create proper api object", () => {
  expect(api.get).toBeInstanceOf(Function);
  expect(api.post).toBeInstanceOf(Function);
});

it("should send get request and retrieve data", async () => {
  const data = await api.get<MockData>("/get-endpoint");

  expect(data).toStrictEqual({
    test: true,
    value: "get-test",
  });
});

it("should send post request with data", async () => {
  const responseData = await api.post<MockData>("/post-endpoint", postData);

  expect(responseData).toStrictEqual(postData);
});
