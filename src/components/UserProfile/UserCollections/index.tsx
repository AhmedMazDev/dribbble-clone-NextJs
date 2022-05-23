import { Grid, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getUserCollectionsByUID } from "../../../firebase/helpers/firestoreFunctions";
import { Collection } from "../../../interfaces/Collection";
import { User } from "../../../interfaces/User";
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
    <>
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
    </>
  );
};
export default Index;
