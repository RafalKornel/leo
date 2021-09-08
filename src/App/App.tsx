import React, { useMemo } from "react";

import { filterUsers } from "../utils";
import { Users } from "../Users";
import { useUsers, useInput } from "../hooks";
import { AppWrapper, ContentWrapper } from "./App.style";

function App() {
  const { users, isError, isLoading, error } = useUsers();

  const { inputValue: searchValue, handleInputChange } = useInput();

  const filteredUsers = useMemo(
    () => filterUsers(users, searchValue),
    [searchValue, users]
  );

  const handleError = (content: JSX.Element) => {
    if (isError) {
      return <span>An error occured :(</span>;
    }

    if (isLoading) {
      return <span>Loading...</span>;
    }

    return content;
  };

  return handleError(
    <ContentWrapper>
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
    </ContentWrapper>
  );
}

const WrapperApp = () => (
  <AppWrapper>
    <App />
  </AppWrapper>
);

export default WrapperApp;
