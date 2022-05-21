import {
  Box,
  Flex,
  Grid,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import React from "react";

type indexProps = {};

const Index: React.FC<indexProps> = () => {
  return (
    <Flex direction="column" h="300px">
      <Box h="75%">
        <Skeleton h="100%" w="100%" />
      </Box>
      <Flex h="25%" w="100%" align="center" justify={"space-between"}>
        <SkeletonCircle />
        <SkeletonText noOfLines={2} w="50%" />
      </Flex>
    </Flex>
  );
};
export default Index;
