export interface Tag {
  label: string;
  value: string;
}

export interface AppContext {
  tags: Tag[];
  showLoginModal: boolean;
  setTags: (tags: Tag[]) => void;
  setShowLoginModal: (value: boolean) => void;
}
