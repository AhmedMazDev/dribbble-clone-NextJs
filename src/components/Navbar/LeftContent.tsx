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
      <Heading
        fontFamily={"Birthstone Bounce"}
        fontWeight="bold"
        fontSize={[30, 40]}
      >
        Inspiry
      </Heading>
    </Flex>
  );
};
export default LeftContent;
