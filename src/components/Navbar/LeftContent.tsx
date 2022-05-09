import { Flex, Heading, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

type LeftContentProps = {};

const LeftContent: React.FC<LeftContentProps> = () => {
  const router = useRouter();
  return (
    <Flex
      align="center"
      onClick={() => {
        router.push("/");
      }}
      cursor="pointer"
    >
      <Image src="/logo.png" alt="logo" mr="6px" height="50px" />
      <Heading fontWeight="12pt" display={{ base: "none", md: "unset" }}>
        Inspiry
      </Heading>
    </Flex>
  );
};
export default LeftContent;
