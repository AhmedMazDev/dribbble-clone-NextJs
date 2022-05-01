import { Flex, Heading, Button, Text, Image } from "@chakra-ui/react";
import React from "react";
import LeftContent from "./LeftContent";
import RightContent from "./RightContent";

type indexProps = {};

const index: React.FC<indexProps> = () => {
  return (
    <Flex
      height="80px"
      padding="6px 12px"
      borderBottom={"1px solid #718096"}
      bg="white"
      position="fixed"
      width="100%"
    >
      <Flex width="90%" alignItems="center" justify="space-between" m="0 auto">
        <LeftContent />
        <RightContent />
      </Flex>
    </Flex>
  );
};
export default index;
