import { Flex, Grid, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Collection } from "../../../../interfaces/Collection";

type indexProps = {
  collection: Collection;
};

const index: React.FC<indexProps> = ({ collection }) => {
  return (
    <Flex
      direction="column"
      borderRadius={15}
      width="100%"
      border="1px solid red"
    >
      <Flex>
        <Image
          src={collection.posts[0]?.postImageURL || "/imagePlaceHolder.png"}
          width="100%"
          height="100%"
        />
      </Flex>
      <Text>{collection.name}</Text>
    </Flex>
  );
};
export default index;
