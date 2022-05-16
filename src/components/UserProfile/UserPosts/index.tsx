import React, { useEffect, useState } from "react";
import { getUserPostsByUsername } from "../../../firebase/helpers/firestoreFunctions";
import { Post } from "../../../interfaces/Post";
import { User } from "../../../interfaces/User";
import PostsList from "../../PostsList";

type indexProps = {
  user: User;
};

const index: React.FC<indexProps> = ({ user }) => {
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  useEffect(() => {
    const getUserPosts = async () => {
      const posts = await getUserPostsByUsername(user.username);
      setUserPosts(posts);
    };

    if (user) {
      getUserPosts();
    }
  }, [user]);

  return (
    <>
      <PostsList posts={userPosts} />
    </>
  );
};
export default index;
