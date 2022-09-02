import { Button, Flex, Grid } from "@chakra-ui/react";
import React from "react";
import { Post } from "../../types/Post";
import PostItem from "./PostItem";

type indexProps = {
  posts: Post[];
  loadMorePosts?: () => void;
  isLoading?: boolean;
  hasMorePosts?: boolean;
};

const Index: React.FC<indexProps> = ({
  posts,
  loadMorePosts,
  isLoading,
  hasMorePosts,
}) => {
  return (
    <Flex direction={"column"} w="100%" gap={10}>
      <Grid
        templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        gridGap={"36px"}
        mt={8}
        w="100%"
        position={"relative"}
      >
        {posts.map((post, i) => (
          <PostItem key={i} post={post} />
        ))}
      </Grid>
      <Flex align="center" justify="center" my={4}>
        {hasMorePosts && (
          <Button isLoading={isLoading} onClick={loadMorePosts}>
            Load More
          </Button>
        )}
      </Flex>
    </Flex>
  );
};
export default Index;
