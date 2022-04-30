import { Flex, Heading, Image, Text } from "@chakra-ui/react";
import router, { useRouter } from "next/router";
import React, { ReactNode } from "react";

type AuthPageLayoutProps = {
  navText: string;
  navLinkText: string;
  navLinkURL: string;
  title: string;
  sideImage: string;
  form: React.ReactNode;
};

const AuthPageLayout: React.FC<AuthPageLayoutProps> = ({
  sideImage,
  navLinkText,
  navLinkURL,
  navText,
  title,
  form,
}) => {
  const router = useRouter();
  return (
    <Flex height="100vh">
      <Image
        src={`/${sideImage}`}
        display={{ base: "none", md: "unset" }}
        height="100%"
        w={{ md: "300px", lg: "500px" }}
        objectFit="cover"
      />
      <Flex
        flexGrow={1}
        padding={{ base: "2rem 2rem", md: "2rem 6rem" }}
        direction="column"
      >
        <Flex justify="flex-end">
          <Text textAlign="end" mr={2}>
            {navText}
          </Text>
          <Text
            color="#3AA4FF"
            cursor="pointer"
            onClick={() => {
              router.push(`/${navLinkURL}`);
            }}
          >
            {navLinkText}
          </Text>
        </Flex>
        <Heading
          as="h1"
          fontSize={{ base: "30px", md: "40px", lg: "50px" }}
          whiteSpace="nowrap"
          my="2rem"
        >
          {title}
        </Heading>
        {form}
      </Flex>
    </Flex>
  );
};
export default AuthPageLayout;
