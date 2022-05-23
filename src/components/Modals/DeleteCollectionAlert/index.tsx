import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { deleteCollection } from "../../../firebase/helpers/firestoreFunctions";
import { Collection } from "../../../interfaces/Collection";

type IndexProps = {
  collection: Collection;
  uid: string;
  username: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const Index: React.FC<IndexProps> = ({
  isOpen,
  setIsOpen,
  collection,
  uid,
  username,
}) => {
  const cancelRef = useRef() as React.MutableRefObject<HTMLButtonElement>;
  const taost = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    setIsLoading(true);
    try {
      await deleteCollection(uid, collection.slug);
      taost({
        title: "Collection deleted",
        description: "Your collection has been deleted",
        status: "success",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
      router.push(`/${username}/collections`);
    } catch (e) {
      taost({
        title: "Error",
        description: "There was an error deleting the collection.",
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    }
    setIsLoading(false);
  };

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Collection
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this collection?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={() => {
                  setIsOpen(false);
                }}
                isLoading={isLoading}
              >
                No
              </Button>
              <Button
                variant={"cancel"}
                ml={3}
                onClick={onDelete}
                isLoading={isLoading}
              >
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
export default Index;
