import { Flex, Grid } from "@chakra-ui/react";
import type { GetServerSideProps, NextPage } from "next";
import PostList from "../components/PostsList";
import { getLatestPosts } from "../firebase/helpers/firestoreFunctions";
import { Post } from "../interfaces/Post";

export const getServerSideProps: GetServerSideProps = async () => {
  const posts = await getLatestPosts();
  return {
    props: {
      posts,
    },
  };
};

type Props = {
  posts: Post[];
};

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <>
      <Flex w="95%" m="0 auto">
        <PostList posts={posts} />
      </Flex>
    </>
  );
};

export default Home;
