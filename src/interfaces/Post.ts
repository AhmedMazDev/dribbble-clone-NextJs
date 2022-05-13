import { Timestamp } from "firebase/firestore";

export interface IPost {
  title: string;
  slug: string;
  imageUrl: string;
  tags: string[];
  numberOfLikes: number;
  username: string;
  userPhoto?: string;
}

export interface Post extends IPost {
  createdAt: number;
  updatedAt: number;
}

export interface PostSnapshot extends IPost {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface PostCollection {
  postId: string;
  postImageURL: string;
}
