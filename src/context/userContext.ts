import { createContext } from "react";
import { UserContext as userContext } from "../interfaces/User";

export const UserContext = createContext<userContext>({
  user: null,
  userLikedPosts: null,
});
