import {
  Button,
  Divider,
  Flex,
  Input,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../context/userContext";
import { Collection as IColl } from "../../../../interfaces/Collection";
import Collection from "./Collection";

type SelectCollectionsProps = {
  setIsCreatingCollection: (value: boolean) => void;
  setIsOpen: (value: boolean) => void;
  postId: string;
  postImageURL: string;
};

const SelectCollections: React.FC<SelectCollectionsProps> = ({
  setIsCreatingCollection,
  postId,
  postImageURL,
  setIsOpen,
}) => {
  const { userCollections } = useContext(UserContext);
  const [collections, setCollections] = useState<IColl[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (userCollections) {
      setCollections(userCollections);
    }
  }, [userCollections]);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    const filteredCollections = userCollections?.filter((collection) =>
      collection.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setCollections(filteredCollections!);
  };

  console.log("select collections", userCollections);

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
          {collections &&
            collections.map((collection) => (
              <Collection
                collection={collection}
                postId={postId}
                postImageURL={postImageURL}
                key={collection.slug}
              />
            ))}
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
          <Button
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Done
          </Button>
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
