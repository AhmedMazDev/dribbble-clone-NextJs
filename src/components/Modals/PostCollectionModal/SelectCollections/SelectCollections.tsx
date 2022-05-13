import {
  ModalHeader,
  Divider,
  ModalBody,
  Text,
  Input,
  Flex,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { UserPostsCollection } from "../../../../interfaces/User";
import { Collection as IColl } from "../../../../interfaces/Collection";
import Collection from "./Collection";
import { UserContext } from "../../../../context/userContext";

type SelectCollectionsProps = {
  setIsCreatingCollection: (value: boolean) => void;
  postId: string;
  postImageURL: string;
};

const SelectCollections: React.FC<SelectCollectionsProps> = ({
  setIsCreatingCollection,
  postId,
  postImageURL,
}) => {
  const [search, setSearch] = useState("");

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setSearch(e.target.value);
    // const filteredCollections = userPostsCollection.filter(
    //   (collection) =>
    //     collection.name.toLowerCase().includes(e.target.value.toLowerCase())
    // );
    // setCollections(filteredCollections!);
  };

  return (
    <>
      <ModalHeader>Add Post To a Collection</ModalHeader>
      <Divider borderBottomWidth="1px" borderColor="textColor" />

      <ModalBody>
        <Input
          placeholder="Search for a collection"
          mb={4}
          value={search}
          onChange={onSearchChange}
        />
        <Flex direction="column" maxHeight="300px" overflowY="scroll">
          {/* {collections.map((collection) => (
            <Collection
              collection={collection}
              postId={postId}
              postImageURL={postImageURL}
              key={collection.slug}
            />
          ))} */}
        </Flex>
      </ModalBody>
      <ModalFooter>
        <Flex
          w={"100%"}
          justify={["center", "space-between"]}
          align="center"
          direction={["column", "row"]}
          gap={4}
        >
          <Button onClick={() => {}}>Done</Button>
          <Button
            variant="cancel"
            onClick={() => {
              setIsCreatingCollection(true);
            }}
          >
            Create Collection
          </Button>
        </Flex>
      </ModalFooter>
    </>
  );
};

export default SelectCollections;
