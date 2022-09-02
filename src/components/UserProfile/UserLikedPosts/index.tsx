import React, { useEffect, useState } from "react";
import {
  getUserLikedPostsByUID,
  getUserLikedPostsByUIDPaginated,
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
  const [userLikedPosts, setUserLikedPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMorePosts, setHasMorePosts] = useState<boolean>(true);

  useEffect(() => {
    const getUserLikedPosts = async () => {
      const likedPosts = await getUserLikedPostsByUID(user.uid);
      setUserLikedPosts(likedPosts);
    };
    if (user) {
      getUserLikedPosts();
    }
  }, [user]);

  if (!userLikedPosts.length) {
    return (
      <>
        <Text>this user has no Liked posts</Text>
      </>
    );
  }

  const loadMorePosts = async () => {
    setIsLoading(true);
    const last = userLikedPosts[userLikedPosts.length - 1];
    const cursor = last.createdAt;

    const newPosts = await getUserLikedPostsByUIDPaginated(user.uid, cursor);

    console.log("newPosts", newPosts);
    setUserLikedPosts((prev) => [...prev, ...newPosts]);
    setIsLoading(false);

    if (newPosts.length < LIMIT) {
      setHasMorePosts(false);
    }
  };

  return (
    <>
      {userLikedPosts && (
        <PostsList
          posts={userLikedPosts}
          loadMorePosts={loadMorePosts}
          hasMorePosts={hasMorePosts}
          isLoading={isLoading}
        />
      )}
    </>
  );
};
export default Index;
