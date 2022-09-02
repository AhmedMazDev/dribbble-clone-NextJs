import { GetServerSideProps } from "next";
import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import {
  getPostsByTag,
  isTagExist,
} from "../../firebase/helpers/firestoreFunctions";
import { Post } from "../../types/Post";
import PostsList from "../../components/PostsList";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const tag = context.query.tag as string;

  const isTagExists = await isTagExist(tag);

  if (!isTagExists) {
    return {
      notFound: true,
    };
  }

  const posts = await getPostsByTag(tag);

  return {
    props: {
      posts,
      tag,
    },
  };
};

type Props = {
  posts: Post[];
  tag: string;
};

const tag: React.FC<Props> = ({ posts, tag }) => {
  return (
    <Flex w="90%" m="0 auto" align="center" direction={"column"} mt={8}>
      <Text fontSize={30} fontWeight="bold" mb={8}>
        {tag}
      </Text>
      {posts ? (
        <PostsList posts={posts} />
      ) : (
        <Text fontSize={20} fontWeight="medium">
          There is no posts that have this tag
        </Text>
      )}
    </Flex>
  );
};
export default tag;
