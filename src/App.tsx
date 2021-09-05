import React from "react";
import { User } from "./user.model";
import { useUsers } from "./useUsers";

function App() {
  const { users, isError, error } = useUsers();

  const renderUsers = (users: User[]) => (
    <ul>
      {users.map((user) => (
        <li>{user.username}</li>
      ))}
    </ul>
  );

  return (
    <div className="App">
      {isError ? `An error occoured: ${error}` : renderUsers(users)}
    </div>
  );
}

export default App;
