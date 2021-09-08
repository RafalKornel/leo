import React, { ChangeEvent, useMemo, useState } from "react";
import { filterUsers } from "../utils";
import { Users } from "../Users";
import { useUsers } from "../hooks";
import { Wrapper } from "./App.style";

const useInput = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return { inputValue, handleInputChange };
};

function App() {
  const { users, isError, error } = useUsers();

  const { inputValue: searchValue, handleInputChange } = useInput();

  const filteredUsers = useMemo(
    () => filterUsers(users, searchValue),
    [searchValue, users]
  );

  return (
    <Wrapper>
      <h1>Users list</h1>
      <input
        type="test"
        value={searchValue}
        onChange={handleInputChange}
        placeholder={"Search by user name..."}
      />
      {isError ? (
        `An error occoured: ${error}`
      ) : (
        <Users users={filteredUsers} />
      )}
    </Wrapper>
  );
}

export default App;
