import React, { ChangeEvent, useMemo, useState } from "react";
import { filterUsers } from "./filterUsers";
import { User } from "./user.model";
import { useUsers } from "./useUsers";

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

  const renderUsers = (users: User[]) => (
    <ul>
      {users.map((user) => (
        <li>{user.username}</li>
      ))}
    </ul>
  );

  return (
    <div className="App">
      <input
        type="test"
        value={searchValue}
        onChange={handleInputChange}
        placeholder={"Search by user name..."}
      />
      {isError ? `An error occoured: ${error}` : renderUsers(filteredUsers)}
    </div>
  );
}

export default App;
