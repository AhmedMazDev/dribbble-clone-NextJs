import { Timestamp } from "firebase/firestore";
import { PostCollection } from "./Post";

export interface ICollection {
  name: string;
  slug: string;
  description: string;
  posts: PostCollection[];
}

export interface Collection extends ICollection {
  createdAt: number;
  updatedAt: number;
}

export interface CollectionSnap extends ICollection {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
