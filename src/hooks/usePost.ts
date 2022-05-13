import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext/appContext";
import { UserContext } from "../context/userContext";
import { likeOrUnlikePost } from "../firebase/helpers/firestoreFunctions";

const usePost = (postId: string) => {
  const { user, userLikedPosts } = useContext(UserContext);
  const { setShowLoginModal } = useContext(AppContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const exists =
      userLikedPosts?.find((post) => post.postId === postId) !== undefined;
    setIsLiked(exists);
  }, [userLikedPosts]);

  const onLikePost = async () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    try {
      setLoading(true);
      await likeOrUnlikePost(user?.uid!, postId, isLiked);
      setIsLiked(!isLiked);
    } catch (error: any) {
      console.log("error liking post", error);
      setError(error.message);
    }

    setLoading(false);
  };

  const onSavePost = async () => {};
  return {
    isLiked,
    loading,
    error,
    onLikePost,
  };
};
export default usePost;
