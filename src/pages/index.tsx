import { Flex, Grid } from "@chakra-ui/react";
import type { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import PostList from "../components/PostsList";
import {
  getLatestPosts,
  getLatestPostsPaginated,
  LIMIT,
} from "../firebase/helpers/firestoreFunctions";
import { Post } from "../types/Post";

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
  const [allPosts, setAllPosts] = useState<Post[]>(posts);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMorePosts, setHasMorePosts] = useState<boolean>(true);

  const loadMorePosts = async () => {
    setIsLoading(true);
    const last = allPosts[allPosts.length - 1];
    const cursor = last.createdAt;

    const newPosts = await getLatestPostsPaginated(cursor);

    setAllPosts((prev) => [...prev, ...newPosts]);
    setIsLoading(false);

    if (newPosts.length < LIMIT) {
      setHasMorePosts(false);
    }
  };

  return (
    <>
      <Flex w="95%" m="0 auto">
        <PostList
          posts={allPosts}
          loadMorePosts={loadMorePosts}
          isLoading={isLoading}
          hasMorePosts={hasMorePosts}
        />
      </Flex>
    </>
  );
};

export default Home;
