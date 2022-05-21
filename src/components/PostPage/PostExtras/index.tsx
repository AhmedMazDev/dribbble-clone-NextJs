import { Avatar, Box, Divider, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { Post } from "../../../interfaces/Post";
import MorePosts from "./MorePosts";
import SimilarPosts from "./SimilarPosts";

type indexProps = {
  post: Post;
};

const index: React.FC<indexProps> = ({ post }) => {
  const router = useRouter();

  return (
    <Flex
      w={"100%"}
      position="relative"
      align={"center"}
      direction={"column"}
      mt={8}
    >
      <Divider borderWidth={"1px"} borderColor="blackAlpha.300" />
      <Flex direction={"column"} transform={"translateY(-40%)"} align="center">
        <Box borderRadius={"50%"} border="8px solid #F8F8F8">
          <Avatar src={post.userPhoto} size="lg" />
        </Box>
        <Text
          fontSize={20}
          fontWeight="medium"
          cursor={"pointer"}
          onClick={() => {
            router.push(`/${post.username}`);
          }}
        >
          {post.userDisplayName}
        </Text>
      </Flex>
      <MorePosts username={post.username} postSlug={post.slug} />
      <SimilarPosts post={post} />
    </Flex>
  );
};
export default index;
