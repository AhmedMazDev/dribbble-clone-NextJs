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
import { deletePost } from "../../../firebase/helpers/firestoreFunctions";

type indexProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  postSlug: string;
};

const Index: React.FC<indexProps> = ({ isOpen, setIsOpen, postSlug }) => {
  const cancelRef = useRef() as React.MutableRefObject<HTMLButtonElement>;
  const taost = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    setIsLoading(true);
    try {
      await deletePost(postSlug);
      taost({
        title: "Post deleted",
        description: "Your Post has been deleted",
        status: "success",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
      router.push(`/posts`);
    } catch (e) {
      taost({
        title: "Error",
        description: "There was an error deleting the post.",
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
              Delete Post
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this post?
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
