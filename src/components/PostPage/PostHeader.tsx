import { Avatar, Button, Flex, Icon, Text, useToast } from "@chakra-ui/react";
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
  userPhoto?: string;
  postId: string;
  postImageURL: string;
};

const PostHeader: React.FC<PostHeaderProps> = ({
  username,
  userPhoto,
  numberOfLikes,
  postId,
  postImageURL,
}) => {
  const { user } = useContext(UserContext);
  const { setShowLoginModal } = useContext(AppContext);
  const { isLiked, loading, onLikePost, error } = usePost(postId);
  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSaveClick = async () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    setIsModalOpen(true);
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
    <Flex align="center" justify="space-between" gap={4} w="100%">
      <PostCollectionModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        postId={postId}
        postImageURL={postImageURL}
      />
      <Flex cursor="pointer" align="center" justify="center" gap={4}>
        <Avatar src={userPhoto} />

        <Text fontSize={24} fontWeight="medium" display={["none", "unset"]}>
          {username}
        </Text>
      </Flex>
      <Flex align="center" gap={4}>
        <Icon as={FiDownload} h={8} w={8} cursor="pointer" />
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
