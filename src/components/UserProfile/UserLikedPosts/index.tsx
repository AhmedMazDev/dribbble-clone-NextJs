import React, { useEffect, useState } from "react";
import { getUserLikedPostsByUID } from "../../../firebase/helpers/firestoreFunctions";
import { Post } from "../../../interfaces/Post";
import { User } from "../../../interfaces/User";
import PostsList from "../../PostsList";
import { Text } from "@chakra-ui/react";

type indexProps = {
  user: User;
};

const index: React.FC<indexProps> = ({ user }) => {
  const [userLikedPosts, setUserLikedPosts] = useState<Post[]>([]);

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

  return <>{userLikedPosts && <PostsList posts={userLikedPosts} />}</>;
};
export default index;
