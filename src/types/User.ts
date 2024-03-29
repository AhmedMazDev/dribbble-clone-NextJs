import { Timestamp } from "firebase/firestore";
import { Collection } from "./Collection";
import { PostCollection } from "./Post";

export interface User {
  uid: string;
  username: string;
  displayName: string;
  email: string;
  photoUrl?: string;
  bio?: string;
  location?: string;
  createdAt: number;
}

export interface UserAlgolia {
  displayName: string;
  createdAt: number;
}

export interface UserContext {
  user: User | null;
  userLikedPosts: UserLikedPosts[] | null;
  userCollections: Collection[] | null;
}

export interface UserLikedPosts {
  postId: string;
}

export interface UserPostsCollection {
  postCollection: Collection[];
}
