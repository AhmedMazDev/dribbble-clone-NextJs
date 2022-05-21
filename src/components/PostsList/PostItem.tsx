import { Avatar, Box, Flex, Icon, Image, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { Post } from "../../interfaces/Post";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FiFolderPlus } from "react-icons/fi";
import { MdOutlineSaveAlt } from "react-icons/md";
import { useRouter } from "next/router";
import usePost from "../../hooks/usePost";
import { AppContext } from "../../context/AppContext/appContext";
import { UserContext } from "../../context/userContext";
import PostSkeleton from "./PostSkeleton";

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
  const [isAlreadyLiked, setIsAlreadyLiked] = useState(isLiked);
  const [isFirstClick, setIsFirstRender] = useState(true);
  const [numberOfLikes, setNumberOfLikes] = useState(post.numberOfLikes);

  useEffect(() => {
    if (isFirstClick) {
      setIsAlreadyLiked(isLiked);
      setNumberOfLikes(post.numberOfLikes);
      return;
    }
    if (isLiked) {
      setNumberOfLikes(
        isAlreadyLiked ? post.numberOfLikes : post.numberOfLikes + 1
      );
    } else {
      setNumberOfLikes(
        isAlreadyLiked ? post.numberOfLikes - 1 : post.numberOfLikes
      );
    }
  }, [isLiked]);

  const onSaveClick = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    setShowCollectionModal(true);
    setPostId(post.slug);
    setPostImageURL(post.imageUrl);
  };

  if (!post) return <PostSkeleton />;

  return (
    <>
      <Box transform={"translate3d(0, 0, 0)"}>
        <Box
          position={"relative"}
          h="0"
          paddingBottom="75%"
          overflow="hidden"
          borderRadius="8px"
          onMouseOver={() => setIsOverlayOpen(true)}
          onMouseLeave={() => setIsOverlayOpen(false)}
        >
          <figure
            style={{ margin: "0", overflow: "hidden", cursor: "pointer" }}
          >
            <Image
              src={post.imageUrl || "/imagePlaceHolder.png"}
              w="100%"
              h="100%"
              objectFit={"cover"}
              position={"absolute"}
              top={0}
              left={0}
              right={0}
              bottom={0}
              cursor={"pointer"}
              onClick={() => router.push(`/posts/${post.slug}`)}
            />
          </figure>
          <Flex
            zIndex={99}
            alignItems="flex-end"
            padding="20px"
            borderRadius="8px"
            transition="opacity 300ms ease"
            opacity={isOverlayOpen ? 1 : 0}
            background="linear-gradient(180deg, rgba(0, 0, 0, 0) 12.82%, rgba(0, 0, 0, 0.72) 100%)"
            position={"absolute"}
            left={0}
            right={0}
            bottom={0}
            height="50%"
          >
            <Flex
              flex={1}
              align="center"
              justifyContent="space-between"
              minW={0}
            >
              <Text
                fontSize="xl"
                fontWeight="bold"
                mb={2}
                color="white"
                textAlign="center"
                cursor={"pointer"}
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
        </Box>
        <Flex
          position={"relative"}
          align="center"
          justify={"space-between"}
          mt="8px"
        >
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
              onClick={() => {
                onLikePost();
                setIsFirstRender(false);
              }}
            />
            <Text>{numberOfLikes}</Text>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};
export default PostItem;
