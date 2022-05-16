import { Grid } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getUserCollectionsByUID } from "../../../firebase/helpers/firestoreFunctions";
import { Collection } from "../../../interfaces/Collection";
import { User } from "../../../interfaces/User";
import CollectionItem from "./CollectionItem";

type indexProps = {
  user: User;
};

const index: React.FC<indexProps> = ({ user }) => {
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
  return (
    <>
      <Grid
        gridTemplateColumns="repeat(auto-fill,minmax(270px,1fr))"
        columnGap={4}
      >
        {userCollections &&
          userCollections.map((collection) => {
            return (
              <CollectionItem collection={collection} key={collection.slug} />
            );
          })}
      </Grid>
    </>
  );
};
export default index;
