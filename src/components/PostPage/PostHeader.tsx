import { Avatar, Button, Flex, Icon, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { FiDownload } from "react-icons/fi";
import { AppContext } from "../../context/AppContext/appContext";
import { UserContext } from "../../context/userContext";
import usePost from "../../hooks/usePost";
import PostCollectionModal from "../Modals/PostCollectionModal";
type PostHeaderProps = {
  numberOfLikes: number;
  username: string;
  userDisplayName: string;
  userPhoto?: string;
  postId: string;
  postImageURL: string;
  postImageName: string;
};

const PostHeader: React.FC<PostHeaderProps> = ({
  username,
  userDisplayName,
  userPhoto,
  numberOfLikes,
  postId,
  postImageName,
  postImageURL,
}) => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const {
    setShowLoginModal,
    setShowCollectionModal,
    setPostId,
    setPostImageURL,
  } = useContext(AppContext);
  const { isLiked, loading, onLikePost, onDownloadPost, error } =
    usePost(postId);
  const toast = useToast();

  const onSaveClick = async () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    setShowCollectionModal(true);
    setPostId(postId);
    setPostImageURL(postImageURL);
  };

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }, [error]);

  return (
    <Flex
      align="center"
      justify="space-between"
      gap={4}
      w="100%"
      maxWidth="900px"
    >
      <Flex
        cursor="pointer"
        align="center"
        justify="center"
        gap={4}
        onClick={() => {
          router.push(`/${username}`);
        }}
      >
        <Avatar src={userPhoto} />

        <Text fontSize={24} fontWeight="medium" display={["none", "unset"]}>
          {userDisplayName}
        </Text>
      </Flex>
      <Flex align="center" gap={4}>
        <Icon
          as={FiDownload}
          h={8}
          w={8}
          cursor="pointer"
          onClick={() => {
            onDownloadPost(postImageURL, postImageName);
          }}
        />
        <Button variant="cancel" color="#3AA4FF" onClick={onSaveClick}>
          Save
        </Button>
        <Button
          leftIcon={
            <Icon as={isLiked ? AiTwotoneHeart : AiOutlineHeart} h={6} w={6} />
          }
          onClick={onLikePost}
          isLoading={loading}
        >
          {numberOfLikes}
        </Button>
      </Flex>
    </Flex>
  );
};
export default PostHeader;
