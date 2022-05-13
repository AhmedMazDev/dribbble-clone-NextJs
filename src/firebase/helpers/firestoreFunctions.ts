import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  serverTimestamp,
  setDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { Tag } from "../../interfaces/AppContext";
import { Collection, CollectionSnap } from "../../interfaces/Collection";
import { Post, PostCollection, PostSnapshot } from "../../interfaces/Post";
import {
  User,
  UserLikedPosts,
  UserPostsCollection,
} from "../../interfaces/User";
import { db } from "../firebaseConfig";

//Post related Functions
export const createPost = async (
  title: string,
  slug: string,
  imageUrl: string,
  tags: string[],
  username: string,
  userPhoto?: string
) => {
  const postRef = doc(db, `posts/${slug}`);
  const post = setDoc(postRef, {
    title,
    slug,
    imageUrl,
    tags,
    username,
    userPhoto,
    numberOfLikes: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return post;
};

export const getPostBySlug = async (slug: string): Promise<Post | null> => {
  const postRef = doc(db, `posts/${slug}`);
  const post = await getDoc(postRef);

  return post.exists() ? postToJson(post.data() as PostSnapshot) : null;
};

export const likeOrUnlikePost = async (
  uid: string,
  postSlug: string,
  isLiked: boolean
) => {
  const postRef = doc(db, `posts/${postSlug}`);
  const userLikedPostCol = doc(db, `users/${uid}/likedPosts/${postSlug}`);

  const batch = writeBatch(db);

  if (!isLiked) {
    batch.set(userLikedPostCol, { postId: postSlug });
    batch.update(postRef, { numberOfLikes: increment(1) });
  } else {
    batch.delete(userLikedPostCol);
    batch.update(postRef, { numberOfLikes: increment(-1) });
  }
  await batch.commit();
};

//Tags related functions
export const getTags = async (): Promise<Tag[]> => {
  const tagsSnap = await getDocs(collection(db, "tags"));
  const tags = tagsSnap.docs.map((doc) => {
    return { label: doc.id, value: doc.data().value as string } as Tag;
  });
  return tags;
};

//User Related Functions

//Collections related functions
export const createCollection = async (
  uid: string,
  name: string,
  slug: string,
  description: string
) => {
  const collectionRef = doc(db, `users/${uid}/collections/${slug}`);
  const collection = await setDoc(collectionRef, {
    name,
    slug,
    description,
    posts: [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

export const addPostToCollection = async (
  uid: string,
  postId: string,
  postImageUrl: string,
  collectionSlug: string
) => {
  const collectionRef = doc(db, `users/${uid}/collections/${collectionSlug}`);
  const updatedCollection = await updateDoc(collectionRef, {
    posts: arrayUnion({
      postId,
      postImageURL: postImageUrl,
    }),
  });
};

//public functions
export const collectionToJson = (collection: CollectionSnap): Collection => {
  return {
    ...collection,
    createdAt: collection.createdAt.toMillis(),
    updatedAt: collection.updatedAt.toMillis(),
  };
};

//Private Functions
const postToJson = (post: PostSnapshot): Post => {
  return {
    ...post,
    createdAt: post.createdAt.toMillis(),
    updatedAt: post.updatedAt.toMillis(),
  };
};
