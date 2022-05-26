import { Button, Flex, Text } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import DeleteCollectionAlert from "../../../components/Modals/DeleteCollectionAlert";
import EditCollectionModal from "../../../components/Modals/EditCollectionModal";
import PostsList from "../../../components/PostsList";
import { UserContext } from "../../../context/userContext";
import {
  getCollectionBySlug,
  getPostsInCollectionBySlug,
  getUserByUsername,
} from "../../../firebase/helpers/firestoreFunctions";
import { Collection } from "../../../interfaces/Collection";
import { Post } from "../../../interfaces/Post";
import { User } from "../../../interfaces/User";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { username, slug } = context.query;

  const user = await getUserByUsername(username as string);

  if (!user) {
    return {
      notFound: true,
    };
  }

  const collection = await getCollectionBySlug(user.uid!, slug as string);

  if (!collection) {
    return {
      notFound: true,
    };
  }

  const collectionPosts = await getPostsInCollectionBySlug(
    user?.uid!,
    slug as string
  );

  return { props: { collection, collectionPosts, collectionOwner: user } };
};

type CollectionProps = {
  collection: Collection;
  collectionPosts: Post[];
  collectionOwner: User;
};

const CollectionPage: NextPage<CollectionProps> = ({
  collection,
  collectionPosts,
  collectionOwner,
}) => {
  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  return (
    <Flex w="90%" m="0 auto" mt={8} direction={"column"} align="center">
      <Flex
        w="100%"
        justify="space-between"
        align={["flex-start", "center"]}
        direction={["column", "row"]}
        gap={4}
      >
        <Flex direction={"column"}>
          <Text fontSize={40} fontWeight="bold" fontFamily={"Rubik"}>
            {collection.name}
          </Text>
          <Text fontSize={20} fontWeight="medium" fontFamily={"Rubik"}>
            {collection.description}
          </Text>
          <Text fontSize={20} fontWeight="normal">
            {collection.posts.length} posts
          </Text>
        </Flex>
        {user?.uid === collectionOwner.uid && (
          <>
            <Flex gap={4}>
              <Button
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                Edit Collection
              </Button>
              <Button
                onClick={() => {
                  setIsAlertOpen(true);
                }}
                variant="delete"
              >
                Delete Collection
              </Button>
            </Flex>
            <EditCollectionModal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              collection={collection}
              uid={user.uid}
            />
            <DeleteCollectionAlert
              isOpen={isAlertOpen}
              setIsOpen={setIsAlertOpen}
              collection={collection}
              uid={user.uid}
              username={user.username}
            />
          </>
        )}
      </Flex>
      <PostsList posts={collectionPosts} />
    </Flex>
  );
};
export default CollectionPage;
