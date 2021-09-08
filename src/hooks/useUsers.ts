import { useEffect, useMemo, useState } from "react";

import api from "../api";
import { UserDto } from "../models";
import { UserModel } from "../models";

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
  isLoading: boolean;
};

export const useUsers = (): UseUsers => {
  const [users, setUsers] = useState<UserModel[]>([]);

  const [error, setError] = useState<string | null>(null);
  const isError = useMemo(() => error !== null, [error]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .get<UserDto[]>("/users")
      .then((users) => {
        setUsers(mapDtoToUsers(users));
        setIsLoading(false);
      })
      .catch((error: Error) => {
        setError(error.message);
      });
  }, []);

  return { users, isError, error, isLoading };
};
