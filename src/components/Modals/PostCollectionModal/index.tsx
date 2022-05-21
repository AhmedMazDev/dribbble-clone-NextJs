import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext/appContext";
import CreateNewCollection from "./CreateNewCollection";
import SelectCollections from "./SelectCollections/SelectCollections";

type indexProps = {};

const Index: React.FC<indexProps> = ({}) => {
  const { showCollectionModal, setShowCollectionModal, postId, postImageURL } =
    useContext(AppContext);
  const [isCreatingCollection, setIsCreatingCollection] = useState(false);

  return (
    <Modal
      isOpen={showCollectionModal}
      onClose={() => {
        setShowCollectionModal(false);
      }}
    >
      <ModalOverlay />

      <ModalContent>
        <ModalCloseButton
          onClick={() => {
            setShowCollectionModal(false);
          }}
        />
        {isCreatingCollection ? (
          <CreateNewCollection
            setIsCreatingCollection={setIsCreatingCollection}
          />
        ) : (
          <SelectCollections
            setIsCreatingCollection={setIsCreatingCollection}
            setIsOpen={setShowCollectionModal}
            postId={postId}
            postImageURL={postImageURL}
          />
        )}
      </ModalContent>
    </Modal>
  );
};
export default Index;
