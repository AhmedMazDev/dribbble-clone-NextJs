import { Button, Flex, Image } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { Post } from "../../interfaces/Post";
import DeletePostAlert from "../Modals/DeletePostAlert";
import EditPostModal from "../Modals/EditPostModal";
import PostExtras from "./PostExtras";
import PostHeader from "./PostHeader";

type indexProps = {
  post: Post;
};

const Index: React.FC<indexProps> = ({ post }) => {
  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  return (
    <Flex
      direction="column"
      align="center"
      justify="space-between"
      mt={8}
      w="80%"
      mx="auto"
      gap={8}
    >
      <PostHeader
        userDisplayName={post.userDisplayName}
        username={post.username}
        userPhoto={post.userPhoto}
        numberOfLikes={post.numberOfLikes}
        postId={post.slug}
        postImageURL={post.imageUrl}
        postImageName={post.imageName}
        postTitle={post.title}
      />
      <Image
        src={post.imageUrl}
        borderRadius={25}
        height="100%"
        width="100%"
        maxHeight="670px"
        maxWidth="900px"
      />
      {user && user.username === post.username && (
        <>
          <Flex gap={4}>
            <Button
              onClick={() => {
                setIsOpen(true);
              }}
            >
              Edit Post
            </Button>
            <Button
              variant={"delete"}
              onClick={() => {
                setIsAlertOpen(true);
              }}
            >
              Delete Post
            </Button>
          </Flex>
          <EditPostModal isOpen={isOpen} setIsOpen={setIsOpen} post={post} />
          <DeletePostAlert
            isOpen={isAlertOpen}
            setIsOpen={setIsAlertOpen}
            postSlug={post.slug}
          />
        </>
      )}

      <PostExtras post={post} />
    </Flex>
  );
};
export default Index;
