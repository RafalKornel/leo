import { UserModel } from "../models";
import { UserComponent, Name, Username } from "./User.style";

type UsersProps = {
  users: UserModel[];
};

export const Users = ({ users }: UsersProps) => {
  return (
    <ol data-testid="usersList">
      {users.map((user, index) => (
        <UserComponent key={`user-${index}`}>
          <Name>{user.name}</Name>
          <Username>@{user.username}</Username>
        </UserComponent>
      ))}
    </ol>
  );
};
