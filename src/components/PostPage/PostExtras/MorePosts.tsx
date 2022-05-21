import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getPostsByUserName } from "../../../firebase/helpers/firestoreFunctions";
import { Post } from "../../../interfaces/Post";
import PostsList from "../../PostsList";

type MorePostsProps = {
  username: string;
  postSlug: string;
};

const MorePosts: React.FC<MorePostsProps> = ({ username, postSlug }) => {
  const [userPosts, setUserPosts] = useState<Post[]>();

  useEffect(() => {
    const getUserPosts = async () => {
      const posts = await getPostsByUserName(username);
      setUserPosts(posts.filter((post) => post.slug !== postSlug));
    };
    getUserPosts();
  }, [username]);

  return (
    <>
      <Flex width={"100%"} direction="column">
        <Text fontSize={25} fontWeight="bold" fontFamily={"Rubik"}>
          More by {username} :
        </Text>
        {userPosts && <PostsList posts={userPosts} />}
        {userPosts?.length === 0 && <Text>This user has no more posts</Text>}
      </Flex>
    </>
  );
};
export default MorePosts;
