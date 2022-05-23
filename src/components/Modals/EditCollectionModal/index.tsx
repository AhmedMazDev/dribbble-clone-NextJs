import {
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Textarea,
  Button,
  ModalFooter,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { updatedCollection } from "../../../firebase/helpers/firestoreFunctions";
import { Collection } from "../../../interfaces/Collection";

type IndexProps = {
  collection: Collection;
  uid: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const Index: React.FC<IndexProps> = ({
  isOpen,
  setIsOpen,
  collection,
  uid,
}) => {
  const toast = useToast();
  const router = useRouter();
  const [name, setName] = useState(collection.name);
  const [description, setDescription] = useState(collection.description);
  const [nameCharacters, setNameCharacters] = useState(
    15 - collection.name.length
  );
  const [descriptionCharacters, setDescriptionCharacters] = useState(
    80 - collection.description.length
  );
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 15) {
      setName(e.target.value);
      setNameCharacters(15 - e.target.value.length);
    }
  };
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (e.target.value.length <= 80) {
      setDescription(e.target.value);
      setDescriptionCharacters(80 - e.target.value.length);
    }
  };

  const onSubmit = async () => {
    setNameError("");
    setDescriptionError("");
    try {
      if (name.length === 0) {
        setNameError("Name is required");
        return;
      }
      if (description.length === 0) {
        setDescriptionError("Description is required");
        return;
      }
      await updatedCollection(uid, collection.slug, name, description);
      setIsLoading(true);
      toast({
        title: "Collection Created",
        description: "Your collection has been updated Successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      setName("");
      setDescription("");
      setIsOpen(false);
      router.reload();
    } catch (error) {
      console.log("collection error", error);
      toast({
        title: "Error",
        description: "An Error Occurred while Updating collection",
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
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton onClick={() => setIsOpen(false)} />
          <ModalHeader>Edit {collection.name} collection</ModalHeader>
          <Divider borderBottomWidth="1px" borderColor="textColor" />
          <ModalBody>
            <form>
              <FormControl mb={8} isInvalid={nameError.length > 0}>
                <Flex justify="space-between" fontWeight="medium">
                  <FormLabel>Name : </FormLabel>
                  <Text>{nameCharacters}</Text>
                </Flex>
                <Input
                  placeholder="Collection Name"
                  value={name}
                  onChange={handleNameChange}
                />
                {nameError && <FormErrorMessage>{nameError}</FormErrorMessage>}
              </FormControl>
              <FormControl isInvalid={descriptionError.length > 0}>
                <Flex justify="space-between" fontWeight="medium">
                  <FormLabel>Description : </FormLabel>
                  <Text>{descriptionCharacters}</Text>
                </Flex>
                <Textarea
                  placeholder="Collection Description"
                  resize={"none"}
                  bg="inputColor"
                  value={description}
                  onChange={handleDescriptionChange}
                />
                {descriptionError && (
                  <FormErrorMessage>{descriptionError}</FormErrorMessage>
                )}
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
              <Button isLoading={isLoading} onClick={onSubmit}>
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
