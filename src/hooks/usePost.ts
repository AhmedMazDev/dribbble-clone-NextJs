import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext/appContext";
import { UserContext } from "../context/userContext";
import FileSaver from "file-saver";
import {
  addOrRemovePostToCollection,
  likeOrUnlikePost,
} from "../firebase/helpers/firestoreFunctions";
import { Collection } from "../interfaces/Collection";

const usePost = (postId: string) => {
  const { user, userLikedPosts } = useContext(UserContext);
  const { setShowLoginModal } = useContext(AppContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingSave, setLoadingSave] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

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

  const onSavePost = async (
    collection: Collection,
    postImageUrl: string,
    isAdding: boolean
  ) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    try {
      setLoadingSave(true);
      await addOrRemovePostToCollection(
        user.uid,
        postId,
        postImageUrl,
        collection.slug,
        isAdding
      );
    } catch (error: any) {
      console.log("error liking post", error);
      setSaveError(error);
    }

    setLoadingSave(false);
  };

  const onDownloadPost = async (
    postImageUrl: string,
    postImageName: string
  ) => {
    const response = await fetch(postImageUrl);
    const imageBlob = await response.blob();
    console.log("second", imageBlob);
    const extension = postImageName.split(".").pop();
    console.log("name", extension);
    const blob = new Blob([imageBlob], {
      type: "image/png,image/jpg,image/gif",
    });

    FileSaver.saveAs(blob, `${postId}.${extension}`);
  };

  return {
    isLiked,
    loading,
    loadingSave,
    error,
    saveError,
    onLikePost,
    onSavePost,
    onDownloadPost,
  };
};
export default usePost;
