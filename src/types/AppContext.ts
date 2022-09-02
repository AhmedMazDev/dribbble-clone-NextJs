export interface Tag {
  label: string;
  value: string;
}

export interface AppContext {
  tags: Tag[];
  postId: string;
  postImageURL: string;
  showLoginModal: boolean;
  showCollectionModal: boolean;
  setTags: (tags: Tag[]) => void;
  setShowLoginModal: (value: boolean) => void;
  setShowCollectionModal: (value: boolean) => void;
  setPostId: (value: string) => void;
  setPostImageURL: (value: string) => void;
}
