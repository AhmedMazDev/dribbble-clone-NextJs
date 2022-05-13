import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import { Post } from "../../interfaces/Post";
import PostHeader from "./PostHeader";

type indexProps = {
  post: Post;
};

const index: React.FC<indexProps> = ({ post }) => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="space-between"
      mt={8}
      w="80%"
      maxWidth="900px"
      mx="auto"
      gap={8}
    >
      <PostHeader
        username={post.username}
        userPhoto={post.userPhoto}
        numberOfLikes={post.numberOfLikes}
        postId={post.slug}
        postImageURL={post.imageUrl}
      />
      <Image
        src={post.imageUrl}
        borderRadius={25}
        height="100%"
        width="100%"
        maxHeight="670px"
        maxWidth="900px"
      />
    </Flex>
  );
};
export default index;
