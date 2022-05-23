import { Flex, Text, Image, Icon, Spinner, useToast } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { Collection } from "../../../../interfaces/Collection";
import { BsCheckLg } from "react-icons/bs";
import usePost from "../../../../hooks/usePost";

type CollectionProps = {
  collection: Collection;
  postId: string;
  postImageURL: string;
};

const Collection: React.FC<CollectionProps> = ({
  collection,
  postId,
  postImageURL,
}) => {
  const toast = useToast();
  const { onSavePost, loadingSave, saveError } = usePost(postId);
  const [isCollectionContainsPost, setIsCollectionContainsPost] =
    useState(false);

  useEffect(() => {
    if (
      collection.posts?.find((post) => post.postId === postId) !== undefined
    ) {
      setIsCollectionContainsPost(true);
    } else {
      setIsCollectionContainsPost(false);
    }
  }, [collection]);

  useEffect(() => {
    if (saveError) {
      toast({
        title: "Error",
        description: "There was an error saving the post to the collection",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }, [saveError]);

  return (
    <>
      {loadingSave ? (
        <Spinner thickness="4px" />
      ) : (
        <Flex
          w="100%"
          mt={2}
          align="center"
          justify={"space-between"}
          p={2}
          bg={isCollectionContainsPost ? "buttonColor" : "white"}
          color={isCollectionContainsPost ? "white" : "textColor"}
          borderRadius={10}
          border="1px solid #e6e6e6"
          cursor="pointer"
          _hover={{
            bg: "gray.100",
          }}
          onClick={() => {
            onSavePost(collection, postImageURL, !isCollectionContainsPost);
          }}
        >
          <Flex gap={4}>
            <Image
              src={
                (collection.posts[0]?.postImageURL as string) ||
                "/imagePlaceHolder.png"
              }
              width="60px"
              height="50px"
            />
            <Flex direction="column">
              <Text fontSize={20}>{collection.name}</Text>
              <Text>{collection.posts?.length} posts</Text>
            </Flex>
          </Flex>
          {isCollectionContainsPost && (
            <Icon as={BsCheckLg} w={6} h={6} mr={2} />
          )}
        </Flex>
      )}
    </>
  );
};
export default Collection;
