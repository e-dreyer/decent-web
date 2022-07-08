import type { NextPage } from "next";
import { useGetAllUsersQuery } from "../services/users";

const Home: NextPage = () => {
  const usersQuery = useGetAllUsersQuery();

  return <>Home Page</>;
};

export default Home;
