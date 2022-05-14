import { Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import { Post } from "../../interfaces/Post";
import PostCollectionModal from "../Modals/PostCollectionModal";
import PostItem from "./PostItem";

type indexProps = {
  posts: Post[];
};

const index: React.FC<indexProps> = ({ posts }) => {
  return (
    <>
      <Grid
        templateColumns="repeat(auto-fill,minmax(350px,400px))"
        columnGap={8}
        rowGap={8}
        mt={8}
        alignItems="center"
        justifyContent="center"
        w="100%"
        gridAutoColumns={"auto"}
      >
        {posts.map((post) => (
          <PostItem key={post.slug} post={post} />
        ))}
      </Grid>
    </>
  );
};
export default index;
