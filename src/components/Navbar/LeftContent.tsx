import { Flex, Heading, Text } from "@chakra-ui/react";
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
      <Flex align={"center"} justify="center" gap={0.5}>
        <Heading
          fontFamily={"Birthstone Bounce"}
          fontWeight="bold"
          fontSize={[30, 40]}
        >
          Inspiry
        </Heading>
        <Text fontWeight="bold" color="#3AA4FF" fontSize={70} pb={5}>
          .
        </Text>
      </Flex>
    </Flex>
  );
};
export default LeftContent;
