import { Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useContext } from "react";
import { AppContext } from "../context/AppContext/appContext";
import { UserContext } from "../context/userContext";

const Home: NextPage = () => {
  const userData = useContext(UserContext);

  return (
    <>
      <Heading fontSize={500}>Hello</Heading>
      <Heading fontSize={500}>Hello</Heading>
      {userData.user && <div>{JSON.stringify(userData.user)}</div>}
    </>
  );
};

export default Home;
