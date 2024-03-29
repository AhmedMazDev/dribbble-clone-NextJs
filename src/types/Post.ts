import { Timestamp } from "firebase/firestore";

export interface IPost {
  title: string;
  slug: string;
  imageUrl: string;
  imageName: string;
  tags: string[];
  numberOfLikes: number;
  username: string;
  userDisplayName: string;
  userPhoto?: string;
}

export interface PostAlgolia {
  title: string;
  slug: string;
  tags: string[];
  username: string;
  createdAt: number;
  updatedAt: number;
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
