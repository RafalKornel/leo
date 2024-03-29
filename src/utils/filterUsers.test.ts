import { createUserModel } from ".";
import { filterUsers } from "./filterUsers";

const mockUserJohn = createUserModel("john");
const mockUserPaul = createUserModel("paul");

const users = [mockUserJohn, mockUserPaul];

it("should filter users", () => {
  const filteredByJo = filterUsers(users, "jo");
  expect(filteredByJo).toContain(mockUserJohn);
  expect(filteredByJo).not.toContain(mockUserPaul);

  const fitleredByPa = filterUsers(users, "pa");
  expect(fitleredByPa).toContain(mockUserPaul);
  expect(fitleredByPa).not.toContain(mockUserJohn);

  const filteredByNothing = filterUsers(users, "");
  expect(filteredByNothing).toContain(mockUserJohn);
  expect(filteredByNothing).toContain(mockUserPaul);

  const filteredByNumbers = filterUsers(users, "123");
  expect(filteredByNumbers).not.toContain(mockUserJohn);
  expect(filteredByNumbers).not.toContain(mockUserPaul);
});

it("should handle lower and upper cases", () => {
  const filterByCapitalJo = filterUsers(users, "JO");
  expect(filterByCapitalJo).toContain(mockUserJohn);
  expect(filterByCapitalJo).not.toContain(mockUserPaul);

  const filterByCapitalPo = filterUsers(users, "Pa");
  expect(filterByCapitalPo).toContain(mockUserPaul);
  expect(filterByCapitalPo).not.toContain(mockUserJohn);
});
