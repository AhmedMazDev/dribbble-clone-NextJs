import { Flex, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import SearchInput from "../SearchInput";

type RightContentProps = {};

const RightContent: React.FC<RightContentProps> = () => {
  const router = useRouter();
  return (
    <Flex align={"center"}>
      <SearchInput />
      <Text
        mr={8}
        cursor="pointer"
        whiteSpace="nowrap"
        onClick={() => {
          router.push("/signin");
        }}
      >
        Log In
      </Text>
      <Button
        onClick={() => {
          router.push("/signup");
        }}
      >
        Sign Up
      </Button>
    </Flex>
  );
};
export default RightContent;
