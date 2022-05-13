import { createContext } from "react";
import { AppContext as appContext } from "../../interfaces/AppContext";

export const AppContext = createContext<appContext>({
  tags: [],
  showLoginModal: false,
  setTags: () => {},
  setShowLoginModal: (value: boolean) => {},
});
