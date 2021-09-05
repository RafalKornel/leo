import { useEffect, useState } from "react";
import api from "./api/jsonPlaceholderApi";
import { User } from "./user.model";

type UseUsers = {
  users: User[];
  isError: boolean;
  error: string | null;
};

export const useUsers = (): UseUsers => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<User[]>("/users")
      .then((users) => setUsers(users))
      .catch((error: Error) => {
        setError(error.message);
      });
  }, []);

  return { users, isError: error !== null, error };
};
