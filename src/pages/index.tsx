import { Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

const Home: NextPage = () => {
  const user = useContext(UserContext);

  return (
    <>
      <Heading fontSize={500}>Hello</Heading>
      <Heading fontSize={500}>Hello</Heading>
      {user && <div>{JSON.stringify(user)}</div>}
    </>
  );
};

export default Home;
