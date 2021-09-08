import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";

import App from ".";
import { createUserDto } from "../utils";

const fakeUsers = [
  createUserDto("test name", "nick1"),
  createUserDto("surname fake", "nick2"),
];

const handler = rest.get(
  "https://jsonplaceholder.typicode.com/users",
  (req, res, ctx) => {
    return res(ctx.json(fakeUsers));
  }
);

const server = setupServer(handler);

beforeAll(() => {
  server.listen();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it("should load and display data correctly", async () => {
  render(<App />);

  const user1 = await screen.findByText("test name");
  const user2 = await screen.findByText("surname fake");

  expect(user1).toBeInTheDocument();
  expect(user2).toBeInTheDocument();
});

it("should handle searchbar", async () => {
  render(<App />);

  const input = await screen.findByRole("textbox");

  await screen.findByText("test name");
  await screen.findByText("surname fake");

  fireEvent.change(input, { target: { value: "test" } });

  expect(screen.queryByText("test name")).toBeInTheDocument();
  expect(screen.queryByText("surname fake")).not.toBeInTheDocument();

  fireEvent.change(input, { target: { value: "" } });

  fireEvent.change(input, { target: { value: "fake" } });

  expect(screen.queryByText("test name")).not.toBeInTheDocument();
  expect(screen.queryByText("surname fake")).toBeInTheDocument();
});
