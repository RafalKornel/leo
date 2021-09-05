import { createUser } from "../utils";
import { render, screen } from "@testing-library/react";
import { Users } from "./Users";

it("should render users", () => {
  const mockedUserPaul = createUser("paul kowalski", "nick1");
  const mockedUserJohn = createUser("john nowak", "nick2");

  const users = [mockedUserJohn, mockedUserPaul];

  render(<Users users={users} />);

  const usersList = screen.getByTestId("usersList");

  expect(usersList).toHaveTextContent("paul kowalski");
  expect(usersList).toHaveTextContent("john nowak");
  expect(usersList).toHaveTextContent("nick1");
  expect(usersList).toHaveTextContent("nick2");
});
