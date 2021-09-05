import { UserModel } from "../models";

export function filterUsers(
  users: UserModel[],
  searchPhrase: string
): UserModel[] {
  const filteredUsers = users.filter((user) => {
    const usernameLowerCase = user.name.toLowerCase();
    const searchPhraseLowerCase = searchPhrase.toLowerCase();

    return usernameLowerCase.includes(searchPhraseLowerCase);
  });

  return filteredUsers;
}
