import { collection, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  useCollection,
  useCollectionData,
  useCollectionDataOnce,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { collectionToJson } from "../firebase/helpers/firestoreFunctions";
import { auth, db } from "../firebase/firebaseConfig";
import { Collection, CollectionSnap } from "../interfaces/Collection";
import { User, UserLikedPosts, UserPostsCollection } from "../interfaces/User";
import { PostCollection } from "../interfaces/Post";

export function useUserData() {
  const [currentUser] = useAuthState(auth);
  const [user, setUser] = useState<User | null>(null);
  const [userLikedPosts, setUserLikedPosts] = useState<UserLikedPosts[] | null>(
    null
  );
  const [userPostsCollection, setUserPostsCollection] = useState<
    Collection[] | null
  >(null);
  const [userCollections, setUserCollections] = useState<Collection[] | null>(
    null
  );

  const [userDataRealtime] = useDocumentData(
    doc(db, `users/${currentUser?.uid!}`)
  );

  const [userLikedPostsRealtime] = useCollectionData(
    collection(db, `users/${currentUser?.uid!}/likedPosts`)
  );

  const [userPostsCollectionRealtime] = useCollectionData(
    collection(db, `users/${currentUser?.uid!}/collections`)
  );

  useEffect(() => {
    if (currentUser) {
      setUser({ uid: currentUser.uid, ...userDataRealtime } as User);
    } else {
      setUser(null);
      setUserLikedPosts(null);
      setUserPostsCollection(null);
    }
  }, [userDataRealtime]);

  useEffect(() => {
    const likedPosts = userLikedPostsRealtime?.map((doc) => {
      return { postId: doc.postId as string } as UserLikedPosts;
    });
    setUserLikedPosts(likedPosts || null);
    console.log("state userLikedPosts", userLikedPosts);
  }, [userLikedPostsRealtime]);

  useEffect(() => {
    const collections = userPostsCollectionRealtime?.map((doc) => {
      return doc as Collection;
    });
    setUserCollections((collections as Collection[]) || null);
  }, [userPostsCollectionRealtime]);

  return {
    user,
    userLikedPosts,
    userPostsCollection,
    userCollections,
  };
}
