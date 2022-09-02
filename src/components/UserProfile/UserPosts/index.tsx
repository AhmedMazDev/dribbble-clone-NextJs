import React, { useEffect, useState } from "react";
import {
  getPostsByUserNamePaginated,
  getUserPostsByUsername,
  LIMIT,
} from "../../../firebase/helpers/firestoreFunctions";
import { Post } from "../../../interfaces/Post";
import { User } from "../../../interfaces/User";
import PostsList from "../../PostsList";
import { Text } from "@chakra-ui/react";

type indexProps = {
  user: User;
};

const Index: React.FC<indexProps> = ({ user }) => {
  const [userPosts, setUserPosts] = useState<Post[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMorePosts, setHasMorePosts] = useState<boolean>(true);

  const loadMorePosts = async () => {
    setIsLoading(true);
    const last = userPosts[userPosts.length - 1];
    const cursor = last.createdAt;

    const newPosts = await getPostsByUserNamePaginated(user.username, cursor);

    setUserPosts((prev) => [...prev, ...newPosts]);
    setIsLoading(false);

    if (newPosts.length < LIMIT) {
      setHasMorePosts(false);
    }
  };

  useEffect(() => {
    const getUserPosts = async () => {
      const posts = await getUserPostsByUsername(user.username);
      setUserPosts(posts);
    };

    if (user) {
      getUserPosts();
    }
  }, [user]);

  if (!userPosts.length) {
    return (
      <>
        <Text>this user has no posts</Text>
      </>
    );
  }

  return (
    <>
      <PostsList
        posts={userPosts}
        loadMorePosts={loadMorePosts}
        hasMorePosts={hasMorePosts}
        isLoading={isLoading}
      />
    </>
  );
};
export default Index;
