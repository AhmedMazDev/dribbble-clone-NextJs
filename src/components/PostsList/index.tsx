import { Grid } from "@chakra-ui/react";
import React from "react";
import { Post } from "../../interfaces/Post";
import PostItem from "./PostItem";
import PostListSkeleton from "./PostSkeleton";

type indexProps = {
  posts: Post[];
};

const index: React.FC<indexProps> = ({ posts }) => {
  return (
    <>
      <Grid
        templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        gridGap={"36px"}
        mt={8}
        w="100%"
        position={"relative"}
      >
        {posts.map((post) => (
          <PostItem key={post.slug} post={post} />
        ))}
      </Grid>
    </>
  );
};
export default index;
