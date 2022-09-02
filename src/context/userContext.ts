import { createContext } from "react";
import { UserContext as userContext } from "../types/User";

export const UserContext = createContext<userContext>({
  user: null,
  userLikedPosts: null,
  userCollections: null,
});
