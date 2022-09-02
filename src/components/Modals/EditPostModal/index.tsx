import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import { CUIAutoComplete } from "chakra-ui-autocomplete";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext/appContext";
import { updtaePost } from "../../../firebase/helpers/firestoreFunctions";
import { Tag } from "../../../types/AppContext";
import { Post } from "../../../types/Post";

type indexProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  post: Post;
};

const Index: React.FC<indexProps> = ({ isOpen, setIsOpen, post }) => {
  const { tags } = useContext(AppContext);
  const toast = useToast();
  const router = useRouter();
  const [title, setTitle] = useState(post.title);
  const [titleCharacters, setTitleCharacters] = useState(
    25 - post.title.length
  );
  const [postTags, setPostTags] = useState<Tag[]>(
    post.tags.map((tag) => {
      return {
        label: tag,
        value: tag,
      };
    })
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 25) {
      setTitle(e.target.value);
      setTitleCharacters(25 - e.target.value.length);
    }
  };

  const handleSelectedItemsChange = (selectedItems?: Tag[]) => {
    if (selectedItems) {
      setPostTags(selectedItems);
    }
  };

  const handleSubmit = async () => {
    if (title.length === 0 || title.length < 5) {
      toast({
        title: "Title is too short",
        description: "Title must be at least 5 characters long",
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
      return;
    }

    if (postTags.length === 0 || postTags.length > 5) {
      toast({
        title: "Tags are too short",
        description: "Tags must be between 1 and 5",
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      const updatedPost: Post = {
        ...post,
        title,
        tags: postTags.map((tag) => tag.value),
      };
      await updtaePost(updatedPost);

      toast({
        title: "Post updated successfully",
        description: "",
        status: "success",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
      router.reload();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong while updating the post",
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
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton onClick={() => setIsOpen(false)} />
          <ModalHeader>Edit {post.title}</ModalHeader>
          <Divider borderBottomWidth="1px" borderColor="textColor" />
          <ModalBody>
            <form>
              <FormControl mb={8}>
                <Flex justify="space-between" fontWeight="medium">
                  <FormLabel>Title</FormLabel>
                  <Text>{titleCharacters}</Text>
                </Flex>
                <Input
                  placeholder="Title"
                  value={title}
                  onChange={handleTitleChange}
                />
              </FormControl>
              <FormControl>
                <CUIAutoComplete
                  items={tags}
                  placeholder={"pick a tag"}
                  label={"Tags"}
                  selectedItems={postTags}
                  onSelectedItemsChange={(changes) =>
                    handleSelectedItemsChange(changes.selectedItems)
                  }
                  disableCreateItem
                  hideToggleButton
                  labelStyleProps={{
                    fontSize: {
                      sm: "18px",
                      md: "26px",
                    },
                  }}
                  listStyleProps={{
                    maxHeight: "100px",
                    overflowY: "scroll",
                  }}
                />
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Flex
              w={"100%"}
              justify={["space-between"]}
              align="center"
              direction={["row"]}
              gap={4}
            >
              <Button isLoading={isLoading} onClick={handleSubmit}>
                Save Changes
              </Button>
              <Button
                variant="cancel"
                isLoading={isLoading}
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Cancel
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default Index;
