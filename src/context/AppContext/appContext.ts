import { createContext } from "react";
import { AppContext as appContext } from "../../types/AppContext";

export const AppContext = createContext<appContext>({
  tags: [],
  postId: "",
  postImageURL: "",
  showLoginModal: false,
  showCollectionModal: false,
  setTags: () => {},
  setShowLoginModal: (value: boolean) => {},
  setShowCollectionModal: (value: boolean) => {},
  setPostId: (value: string) => {},
  setPostImageURL: (value: string) => {},
});
