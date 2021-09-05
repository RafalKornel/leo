import styled from "styled-components";
import { UserDto } from "../user.dto";

type UsersProps = {
  users: UserDto[];
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

const UserComponent = styled.li`
  color: #aaa;

  span {
    margin: 0 5px;
  }
`;

const Name = styled.span`
  color: #000;
  font-weight: bold;
`;

const Username = styled.span`
  font-size: 14px;
`;
