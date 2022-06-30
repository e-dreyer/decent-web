import type { NextPage } from "next";
import { useGetAllUsersQuery } from "../services/users";

const Home: NextPage = () => {
  const usersQuery = useGetAllUsersQuery();

  return (
    <>
      {usersQuery.isLoading ? (
        <div>Loading Users</div>
      ) : usersQuery.error ? (
        <div>Error loading users</div>
      ) : usersQuery.data ? (
        usersQuery.data.map((user, userIndex) => {
          return <div key={userIndex}>{user.id}</div>;
        })
      ) : null}
    </>
  );
};

export default Home;
