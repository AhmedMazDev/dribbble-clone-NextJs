import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { UserContext } from "../../../context/userContext";
import CreateNewCollection from "./CreateNewCollection";
import SelectCollections from "./SelectCollections/SelectCollections";

type indexProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  postId: string;
  postImageURL: string;
};

const index: React.FC<indexProps> = ({
  isOpen,
  setIsOpen,
  postId,
  postImageURL,
}) => {
  const { user } = useContext(UserContext);
  const [isCreatingCollection, setIsCreatingCollection] = useState(false);

  return (
    <Modal isOpen={isOpen} onClose={() => {}}>
      <ModalOverlay />

      <ModalContent>
        <ModalCloseButton
          onClick={() => {
            setIsOpen(false);
          }}
        />
        {isCreatingCollection ? (
          <CreateNewCollection
            setIsCreatingCollection={setIsCreatingCollection}
            user={user}
          />
        ) : (
          <SelectCollections
            setIsCreatingCollection={setIsCreatingCollection}
            postId={postId}
            postImageURL={postImageURL}
          />
        )}
      </ModalContent>
    </Modal>
  );
};
export default index;
