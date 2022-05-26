import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { Tag } from "../../interfaces/AppContext";
import { Collection, CollectionSnap } from "../../interfaces/Collection";
import { Post, PostCollection, PostSnapshot } from "../../interfaces/Post";
import { User } from "../../interfaces/User";
import { db } from "../firebaseConfig";

//Post related Functions
export const createPost = async (
  title: string,
  slug: string,
  imageUrl: string,
  imageName: string,
  tags: string[],
  username: string,
  userDisplayName: string,
  userPhoto?: string
) => {
  const postRef = doc(db, `posts/${slug}`);
  const post = setDoc(postRef, {
    title,
    slug,
    imageUrl,
    imageName,
    tags,
    username,
    userDisplayName,
    userPhoto,
    numberOfLikes: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return post;
};

export const updtaePost = async (post: Post) => {
  const postRef = doc(db, `posts/${post.slug}`);
  const updatedPost = await updateDoc(postRef, {
    ...post,
    tags: post.tags,
    title: post.title,
    updatedAt: serverTimestamp(),
  });
};

export const deletePost = async (slug: string) => {
  const postRef = doc(db, `posts/${slug}`);
  const deletedPost = await deleteDoc(postRef);
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

export const getLatestPosts = async (): Promise<Post[]> => {
  const q = query(collection(db, "posts"), orderBy("createdAt"), limit(20));
  const postsSnap = await getDocs(q);
  return postsSnap.docs.map((post) => postToJson(post.data() as PostSnapshot));
};

export const getPostsByTag = async (tag: string): Promise<Post[] | null> => {
  const q = query(
    collection(db, "posts"),
    where("tags", "array-contains", tag),
    orderBy("createdAt"),
    limit(20)
  );
  const postsSnap = await getDocs(q);
  if (postsSnap.empty) return null;
  return postsSnap.docs.map((post) => postToJson(post.data() as PostSnapshot));
};

export const getPostsByUserName = async (
  username: string
): Promise<Post[] | []> => {
  const q = query(
    collection(db, "posts"),
    where("username", "==", username),
    orderBy("createdAt"),
    limit(3)
  );
  const postsSnap = await getDocs(q);
  if (postsSnap.empty) return [];
  return postsSnap.docs.map((post) => postToJson(post.data() as PostSnapshot));
};

export const getSimilarPosts = async (
  postTags: string[]
): Promise<Post[] | []> => {
  const q = query(
    collection(db, "posts"),
    where("tags", "array-contains-any", postTags),
    orderBy("createdAt"),
    limit(6)
  );
  const postsSnap = await getDocs(q);
  if (postsSnap.empty) return [];
  return postsSnap.docs.map((post) => postToJson(post.data() as PostSnapshot));
};

//Tags related functions
export const getTags = async (): Promise<Tag[]> => {
  const tagsSnap = await getDocs(collection(db, "tags"));
  const tags = tagsSnap.docs.map((doc) => {
    return { label: doc.id, value: doc.data().value as string } as Tag;
  });
  return tags;
};

export const isTagExist = async (tag: string): Promise<boolean> => {
  const tagRef = doc(db, `tags/${tag}`);
  const tagSnap = await getDoc(tagRef);
  return tagSnap.exists();
};

//User Related Functions
export const getUserByUsername = async (
  username: string
): Promise<User | null> => {
  const q = query(
    collection(db, "users"),
    where("username", "==", username),
    limit(1)
  );
  const userSnap = await getDocs(q);
  return userSnap.docs.length > 0
    ? ({ uid: userSnap.docs[0].id, ...userSnap.docs[0].data() } as User)
    : null;
};

export const getUserPostsByUsername = async (
  username: string
): Promise<Post[] | []> => {
  const q = query(
    collection(db, "posts"),
    where("username", "==", username),
    limit(20)
  );
  const postsSnap = await getDocs(q);
  return postsSnap.docs.length > 0
    ? (postsSnap.docs.map((post) => {
        return postToJson(post.data() as PostSnapshot);
      }) as Post[])
    : [];
};

export const getUserCollectionsByUID = async (
  uid: string
): Promise<Collection[] | []> => {
  const collectionRef = collection(db, `users/${uid}/collections`);
  const collectionsSnap = await getDocs(collectionRef);
  return collectionsSnap.docs.length > 0
    ? collectionsSnap.docs.map((collection) => {
        return collectionToJson(collection.data() as CollectionSnap);
      })
    : [];
};

export const getUserLikedPostsByUID = async (
  uid: string
): Promise<Post[] | []> => {
  const userLikedPostsRef = collection(db, `users/${uid}/likedPosts`);
  const userLikedPostsSnap = await getDocs(userLikedPostsRef);

  const userLikedPostsSlugs = userLikedPostsSnap.docs.map((doc) => doc.id);

  if (userLikedPostsSlugs.length === 0) return [];

  const q = query(
    collection(db, "posts"),
    where("slug", "in", userLikedPostsSlugs)
  );
  const postsSnap = await getDocs(q);
  const posts = postsSnap.docs.map((post) =>
    postToJson(post.data() as PostSnapshot)
  );
  return posts.length > 0 ? posts : [];
};

export const updateUserProfile = async (
  user: Omit<User, "email" | "username" | "createdAt">
): Promise<void> => {
  const userRef = doc(db, `users/${user.uid}`);
  await updateDoc(userRef, user);
};

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

export const updatedCollection = async (
  uid: string,
  slug: string,
  name: string,
  description: string
) => {
  const collectionRef = doc(db, `users/${uid}/collections/${slug}`);
  const collection = await updateDoc(collectionRef, {
    name,
    description,
  });
};

export const deleteCollection = async (uid: string, slug: string) => {
  const collectionRef = doc(db, `users/${uid}/collections/${slug}`);
  await deleteDoc(collectionRef);
};

export const addOrRemovePostToCollection = async (
  uid: string,
  postId: string,
  postImageUrl: string,
  collectionSlug: string,
  isAdding: boolean
) => {
  const collectionRef = doc(db, `users/${uid}/collections/${collectionSlug}`);
  if (isAdding) {
    await updateDoc(collectionRef, {
      posts: arrayUnion({
        postId,
        postImageURL: postImageUrl,
      }),
    });
  } else {
    const updatedCollection = await updateDoc(collectionRef, {
      posts: arrayRemove({
        postId,
        postImageURL: postImageUrl,
      }),
    });
  }
};

export const getPostsInCollectionBySlug = async (
  uid: string,
  slug: string
): Promise<Post[] | []> => {
  const collectionRef = doc(db, `users/${uid}/collections/${slug}`);
  const collectionSnap = await getDoc(collectionRef);
  if (!collectionSnap.exists()) return [];

  const postSlugs = collectionSnap
    .data()
    ?.posts?.map((post: PostCollection) => post.postId);

  const postsQuery = query(
    collection(db, "posts"),
    where("slug", "in", postSlugs),
    orderBy("createdAt"),
    limit(20)
  );

  const postsSnap = await getDocs(postsQuery);
  return postsSnap.docs.length > 0
    ? postsSnap.docs.map((post) => {
        return postToJson(post.data() as PostSnapshot);
      })
    : [];
};

export const getCollectionBySlug = async (
  uid: string,
  slug: string
): Promise<Collection | null> => {
  const collectionRef = doc(db, `users/${uid}/collections/${slug}`);
  const collectionSnap = await getDoc(collectionRef);
  return collectionSnap.exists()
    ? collectionToJson(collectionSnap.data() as CollectionSnap)
    : null;
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
