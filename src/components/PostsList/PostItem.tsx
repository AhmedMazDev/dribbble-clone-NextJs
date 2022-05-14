import { Avatar, Box, Flex, Icon, Image, Text } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { Post } from "../../interfaces/Post";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FiFolderPlus } from "react-icons/fi";
import { MdOutlineSaveAlt } from "react-icons/md";
import { useRouter } from "next/router";
import usePost from "../../hooks/usePost";
import { AppContext } from "../../context/AppContext/appContext";
import { UserContext } from "../../context/userContext";

type PostItemProps = {
  post: Post;
};

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const {
    setShowLoginModal,
    setShowCollectionModal,
    setPostImageURL,
    setPostId,
  } = useContext(AppContext);
  const { isLiked, onLikePost, onDownloadPost } = usePost(post.slug);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const onSaveClick = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    setShowCollectionModal(true);
    setPostId(post.slug);
    setPostImageURL(post.imageUrl);
  };

  return (
    <Flex mb={4} direction="column" width="100%">
      <Flex
        w="100%"
        mb={2}
        cursor="pointer"
        direction="column"
        position="relative"
        onMouseOver={() => setIsOverlayOpen(true)}
        onMouseLeave={() => setIsOverlayOpen(false)}
      >
        <Flex zIndex={1}>
          <Image
            src={post.imageUrl}
            borderRadius={15}
            height="300px"
            width="400px"
            objectFit={"cover"}
            objectPosition={"center"}
            onClick={() => {
              router.push(`/posts/${post.slug}`);
            }}
          />
        </Flex>
        <Flex
          display={isOverlayOpen ? "block" : "none"}
          zIndex={99}
          borderBottomRadius={15}
          position="absolute"
          bottom="0"
          w="100%"
          h="30%"
          background="linear-gradient(180deg, rgba(0, 0, 0, 0) 12.82%, rgba(0, 0, 0, 0.72) 100%)"
        >
          <Flex
            align="center"
            justify="space-between"
            width="90%"
            h="100%"
            m="0 auto"
            mt={2}
          >
            <Text
              fontSize="xl"
              fontWeight="bold"
              mb={2}
              color="white"
              textAlign="center"
              onClick={() => {
                router.push(`/posts/${post.slug}`);
              }}
            >
              {post.title}
            </Text>
            <Flex gap={4}>
              <Icon
                as={FiFolderPlus}
                w={10}
                h={10}
                p={2}
                bg="white"
                borderRadius={10}
                onClick={() => {
                  onSaveClick();
                }}
                cursor="pointer"
                _hover={{
                  bg: "gray.200",
                }}
              />
              <Icon
                as={MdOutlineSaveAlt}
                w={10}
                h={10}
                p={2}
                borderRadius={10}
                bg="white"
                cursor="pointer"
                onClick={() => {
                  onDownloadPost(post.imageUrl, post.imageName);
                }}
                _hover={{
                  bg: "gray.200",
                }}
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex align="center" justify="space-between">
        <Flex
          align="center"
          gap={2}
          cursor="pointer"
          onClick={() => {
            router.push(`/${post.username}`);
          }}
        >
          <Avatar src={post.userPhoto} size={"sm"} />
          <Text fontSize={18} fontWeight="medium">
            {post.username}
          </Text>
        </Flex>
        <Flex align="center" gap={2}>
          <Icon
            as={isLiked ? AiFillHeart : AiOutlineHeart}
            color="buttonColor"
            w={7}
            h={7}
            cursor="pointer"
            onClick={onLikePost}
          />
          <Text>{isLiked ? post.numberOfLikes + 1 : post.numberOfLikes}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PostItem;
