import { Box, Flex, Input, Text } from "@chakra-ui/react";
import React from "react";

type indexProps = {};

const Index: React.FC<indexProps> = () => {
  return (
    <Flex direction={"column"} w="100%">
      <Flex
        h="50vh"
        backgroundImage={"url(./search-cover.png)"}
        backgroundRepeat="no-repeat"
        backgroundPosition="center center"
        backgroundSize={"cover"}
        align="center"
        justify="center"
      >
        <Text
          color="white"
          fontSize={[25, 50]}
          fontWeight="bold"
          textAlign={"center"}
        >
          Find best shots from thousands images{" "}
        </Text>
      </Flex>
      <Flex w="100%" align="center" justify={"center"}>
        <Input
          w="50%"
          type="search"
          bgColor={"white"}
          p={"30px"}
          placeholder="search"
        />
      </Flex>
    </Flex>
  );
};
export default Index;
