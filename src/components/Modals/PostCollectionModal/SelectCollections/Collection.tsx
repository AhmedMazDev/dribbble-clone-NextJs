import { Flex, Text, Image, Icon, Spinner } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { Collection } from "../../../../interfaces/Collection";
import { BsCheckLg } from "react-icons/bs";
import { addPostToCollection } from "../../../../firebase/helpers/firestoreFunctions";
import { UserContext } from "../../../../context/userContext";
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
  const { user } = useContext(UserContext);
  const [isCollectionContainsPost, setIsCollectionContainsPost] =
    useState(false);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (
  //     collection.posts?.find((post) => post.postId === postId) !== undefined
  //   ) {
  //     setIsCollectionContainsPost(true);
  //   }
  //   console.log("exist", isCollectionContainsPost);
  //   console.log("first", collection);
  // }, [userPostsCollection]);

  const onCollectionSelect = async () => {
    setLoading(true);
    try {
      if (!isCollectionContainsPost) {
        await addPostToCollection(
          user?.uid!,
          postId,
          postImageURL,
          collection.slug
        );
      } else {
      }
    } catch (error) {
      console.log("collection error", error);
    }
    setLoading(false);
  };

  return (
    <>
      <Flex
        w="100%"
        mt={2}
        align="center"
        justify={"space-between"}
        p={2}
        borderRadius={10}
        border="1px solid gray"
        cursor="pointer"
        _hover={{
          bg: "gray.100",
        }}
        onClick={onCollectionSelect}
      >
        <Flex gap={4}>
          <Image
            src={
              (collection.posts?.pop()?.postImageURL as string) ||
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
        {isCollectionContainsPost && <Icon as={BsCheckLg} w={6} h={6} mr={2} />}
        {loading && <Spinner thickness="4px" />}
      </Flex>
    </>
  );
};
export default Collection;
