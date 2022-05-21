import { Flex, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { getSimilarPosts } from "../../../firebase/helpers/firestoreFunctions";
import { Post } from "../../../interfaces/Post";
import PostsList from "../../PostsList";

type SimilarPostsProps = {
  post: Post;
};

const SimilarPosts: React.FC<SimilarPostsProps> = ({ post }) => {
  const [similarPosts, setSimilarPosts] = React.useState<Post[]>([]);
  useEffect(() => {
    const getPosts = async () => {
      const posts = await getSimilarPosts(post.tags);
      setSimilarPosts(posts.filter((p) => p.slug !== post.slug));
    };
    getPosts();
  }, [post]);

  return (
    <>
      <Flex width={"100%"} direction="column" mt={8}>
        <Text fontSize={25} fontWeight="bold" fontFamily={"Rubik"}>
          Similar Posts :
        </Text>
        {similarPosts && <PostsList posts={similarPosts} />}
        {similarPosts?.length === 0 && <Text>No similar posts</Text>}
      </Flex>
    </>
  );
};
export default SimilarPosts;
