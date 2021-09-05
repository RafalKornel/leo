import { User } from "./user.model";

export function filterUsers(users: User[], searchPhrase: string): User[] {
  const filteredUsers = users.filter((user) => {
    const usernameLowerCase = user.username.toLowerCase();
    const searchPhraseLowerCase = searchPhrase.toLowerCase();

    return usernameLowerCase.includes(searchPhraseLowerCase);
  });

  return filteredUsers;
}
