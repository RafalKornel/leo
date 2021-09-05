import React, { ChangeEvent, useMemo, useState } from "react";
import { filterUsers } from "../utils";
import { Users } from "../Users";
import { useUsers } from "../hooks";

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
    <div className="App">
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
    </div>
  );
}

export default App;
