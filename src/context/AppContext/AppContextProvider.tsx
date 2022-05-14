import React, { useEffect, useState } from "react";
import { getTags } from "../../firebase/helpers/firestoreFunctions";
import { Tag } from "../../interfaces/AppContext";
import { AppContext } from "./appContext";

type AppContextProviderProps = {
  children: React.ReactNode;
};

const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [postId, setPostId] = useState<string>("");
  const [postImageURL, setPostImageURL] = useState<string>("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCollectionModal, setShowCollectionModal] = useState(false);

  useEffect(() => {
    const getTagsFromFirestore = async () => {
      const tags = await getTags();
      setTags(tags);
    };

    getTagsFromFirestore();
  }, []);

  return (
    <AppContext.Provider
      value={{
        tags,
        showLoginModal,
        setTags,
        postImageURL,
        postId,
        setShowLoginModal,
        showCollectionModal,
        setShowCollectionModal,
        setPostId,
        setPostImageURL,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppContextProvider;
