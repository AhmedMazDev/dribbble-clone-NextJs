import { Flex } from "@chakra-ui/react";
import React from "react";
import SearchBar from "./SearchBar";

type indexProps = {};

const Index: React.FC<indexProps> = () => {
  return (
    <Flex w="100%">
      <SearchBar />
    </Flex>
  );
};
export default Index;
