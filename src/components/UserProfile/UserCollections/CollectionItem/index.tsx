import { Box, Flex, Grid, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { Collection } from "../../../../types/Collection";
import { User } from "../../../../types/User";

type indexProps = {
  collection: Collection;
  user: User;
};

const Index: React.FC<indexProps> = ({ collection, user }) => {
  const router = useRouter();
  return (
    <Flex
      direction="column"
      cursor="pointer"
      onClick={() => {
        router.push(`/${user.username}/collections/${collection.slug}`);
      }}
    >
      <Box position="relative" w="100%" pb="100%">
        <Flex
          direction="column"
          position={"absolute"}
          top="0"
          right="0"
          bottom="0"
          left="0"
        >
          <Box
            backgroundImage={`url(${
              collection.posts[0]?.postImageURL || "/imagePlaceHolder.png"
            })`}
            width="100%"
            height="75%"
            position="relative"
            backgroundSize={"cover"}
            backgroundPosition="center"
            backgroundRepeat={"no-repeat"}
            borderRadius="8px 8px 0 0 "
          ></Box>
          <Flex mt="4px" h="25%">
            <Box
              backgroundImage={`url(${
                collection.posts[1]?.postImageURL || "/imagePlaceHolder.png"
              })`}
              borderRadius="0 0 0 8px"
              position={"relative"}
              w="100%"
              backgroundSize={"cover"}
              backgroundPosition="center"
              backgroundRepeat={"no-repeat"}
            ></Box>
            <Box
              backgroundImage={`url(${
                collection.posts[2]?.postImageURL || "/imagePlaceHolder.png"
              })`}
              position={"relative"}
              w="100%"
              backgroundSize={"cover"}
              backgroundPosition="center"
              backgroundRepeat={"no-repeat"}
              ml="4px"
            ></Box>
            <Box
              backgroundImage={`url(${
                collection.posts[3]?.postImageURL || "/imagePlaceHolder.png"
              })`}
              borderRadius="0 0 8px"
              position={"relative"}
              w="100%"
              backgroundSize={"cover"}
              backgroundPosition="center"
              backgroundRepeat={"no-repeat"}
              ml="4px"
            ></Box>
          </Flex>
        </Flex>
      </Box>
      <Flex direction="column" align="center" mt={2}>
        <Text fontWeight={"bold"} fontSize={20}>
          {collection.name}
        </Text>
        <Text>{collection.posts.length} posts</Text>
      </Flex>
    </Flex>
  );
};
export default Index;
