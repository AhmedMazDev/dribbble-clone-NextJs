import {
  useToast,
  ModalHeader,
  Divider,
  ModalBody,
  FormControl,
  Flex,
  Text,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { nanoid } from "nanoid";
import React, { useState } from "react";
import { createCollection } from "../../../firebase/helpers/firestoreFunctions";
import { User } from "../../../interfaces/User";

type CreateNewCollectionProps = {
  setIsCreatingCollection: (value: boolean) => void;
  user: User | null;
};

const CreateNewCollection: React.FC<CreateNewCollectionProps> = ({
  setIsCreatingCollection,
  user,
}) => {
  const toast = useToast();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nameCharacters, setNameCharacters] = useState(15);
  const [descriptionCharacters, setDescriptionCharacters] = useState(50);
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
    if (e.target.value.length <= 50) {
      setDescription(e.target.value);
      setDescriptionCharacters(50 - e.target.value.length);
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
      setIsLoading(true);
      const slug = encodeURI(
        name.replaceAll(" ", "").toLowerCase() + "-" + (await nanoid(5))
      );
      await createCollection(user!.uid, name, slug, description);
      toast({
        title: "Collection Created",
        description: "Your collection has been created Successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      setName("");
      setDescription("");
      setIsCreatingCollection(false);
    } catch (error) {
      console.log("collection error", error);
      toast({
        title: "Error",
        description: "An Error Occurred while creating collection",
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
      <ModalHeader>Create a New Collection</ModalHeader>
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
          <Button onClick={onSubmit} isLoading={isLoading}>
            Create
          </Button>
          <Button
            variant="cancel"
            isLoading={isLoading}
            onClick={() => {
              setIsCreatingCollection(false);
            }}
          >
            Cancel
          </Button>
        </Flex>
      </ModalFooter>
    </>
  );
};
export default CreateNewCollection;
