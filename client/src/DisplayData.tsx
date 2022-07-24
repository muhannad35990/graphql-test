import React, { useState } from "react";
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";

interface User {
  id: number;
  name: string;
  username: string;
  age: number;
}

const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      username
      age
    }
  }
`;
const QUERY_USER = gql`
  query GetUser($userId: ID!) {
    user(id: $userId) {
      id
      name
      username
    }
  }
`;

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: createUserInput!) {
    createUser(input: $input) {
      id
      name
      username
    }
  }
`;

const UPDATE_USERNAME_MUTATION = gql`
  mutation UpdateUsername($updateUsernameInput: updateUsernameInput!) {
    updateUsername(input: $updateUsernameInput) {
      id
      username
    }
  }
`;

const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($userId: ID!) {
    deleteUser(id: $userId) {
      id
    }
  }
`;

function DisplayData() {
  const [searchValue, setSearchValue] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(18);
  const [nationality, setNationality] = useState("");
  const { data, loading, error: usersError } = useQuery(QUERY_ALL_USERS);
  const [fetchUser, { data: userData, error }] = useLazyQuery(QUERY_USER);
  const [createUser, {}] = useMutation(CREATE_USER_MUTATION);

  if (loading) return <div>Data is loading ...</div>;

  return (
    <div className="flex flex-col">
      <div className="flex">
        <input
          type="text"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="number"
          placeholder="age"
          onChange={(e) => setAge(Number(e.target.value))}
        />
        <input
          type="text"
          placeholder="nationality"
          onChange={(e) => setNationality(e.target.value)}
        />
        <button
          onClick={() =>
            createUser({
              variables: { input: { name, username, age, nationality } },
            })
          }
        >
          Add New User
        </button>
      </div>

      {data &&
        data.users.map((item: User) => {
          return (
            <div className="flex flex-col my-4 p-4 border-solid border-2">
              <h3> {item.id}</h3>
              <h3>{item.name}</h3>
              <h3>{item.username}</h3>
              <h3>{item.age}</h3>
            </div>
          );
        })}
      <div className="h-1 w-16 text-black"></div>
      <div className="mt-8">
        <input
          type="text"
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="search By user id"
          className="border-1"
        />
        <button
          onClick={() => fetchUser({ variables: { userId: searchValue } })}
        >
          Get User
        </button>
        {userData?.user && (
          <div className="flex flex-col my-4 p-4 border-solid border-2">
            <h3> {userData.user.id}</h3>
            <h3>{userData.user.name}</h3>
            <h3>{userData.user.username}</h3>
            <h3>{userData.user.age}</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default DisplayData;
