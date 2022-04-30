import { Flex, Heading, Button, Text, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import SearchInput from "../SearchInput";

type indexProps = {};

const index: React.FC<indexProps> = () => {
  const router = useRouter();
  return (
    <Flex
      height="80px"
      padding="6px 12px"
      borderBottom={"1px solid black"}
      bg="white"
    >
      <Flex width="90%" alignItems="center" justify="space-between" m="0 auto">
        <Flex align="center">
          <Image src="/logo.png" alt="logo" mr="6px" height="50px" />
          <Heading fontWeight="12pt" display={{ base: "none", md: "unset" }}>
            Inspiry
          </Heading>
        </Flex>

        <Flex align={"center"}>
          <SearchInput />
          <Text mr={8} cursor="pointer" whiteSpace="nowrap">
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
      </Flex>
    </Flex>
  );
};
export default index;
