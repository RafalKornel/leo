import { useEffect, useState } from "react";
import api from "../api/jsonPlaceholderApi";
import { UserDto } from "../models";
import { UserModel } from "../models/user.model";

/** Custom model mapping protects from problems due to dto models change */
const mapDtoToUsers = (dtos: UserDto[]): UserModel[] => {
  return dtos.map(({ id, name, username }) => ({
    id,
    name,
    username,
  }));
};

type UseUsers = {
  users: UserModel[];
  isError: boolean;
  error: string | null;
};

export const useUsers = (): UseUsers => {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<UserDto[]>("/users")
      .then((users) => setUsers(mapDtoToUsers(users)))
      .catch((error: Error) => {
        setError(error.message);
      });
  }, []);

  return { users, isError: error !== null, error };
};
