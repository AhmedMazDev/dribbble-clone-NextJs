import { Button, Flex, Grid, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  getUserCollectionsByUID,
  LIMIT,
} from "../../../firebase/helpers/firestoreFunctions";
import { Collection } from "../../../types/Collection";
import { User } from "../../../types/User";
import CollectionItem from "./CollectionItem";

type indexProps = {
  user: User;
};

const Index: React.FC<indexProps> = ({ user }) => {
  const [userCollections, setUserCollections] = useState<Collection[]>([]);

  useEffect(() => {
    const getUserCollections = async () => {
      const collections = await getUserCollectionsByUID(user.uid);
      setUserCollections(collections);
    };

    if (user) {
      getUserCollections();
    }
  }, [user]);

  if (!userCollections.length) {
    return (
      <>
        <Text>this user has no Collections</Text>
      </>
    );
  }

  return (
    <Flex w="100%" direction={"column"} gap={10}>
      <Grid
        gridTemplateColumns="repeat(auto-fill, minmax(270px, 1fr))"
        gridGap={"48px"}
      >
        {userCollections &&
          userCollections.map((collection) => {
            return (
              <CollectionItem
                collection={collection}
                key={collection.slug}
                user={user}
              />
            );
          })}
      </Grid>
    </Flex>
  );
};
export default Index;
