import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { CUIAutoComplete } from "chakra-ui-autocomplete";
import { nanoid } from "nanoid/async";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../context/AppContext/appContext";
import { UserContext } from "../context/userContext";
import { auth } from "../firebase/firebaseConfig";
import { createPost, getTags } from "../firebase/helpers/firestoreFunctions";
import useSelectImage from "../hooks/useSelectFile";
import useUploadImage from "../hooks/useUploadImage";
import { Tag } from "../types/AppContext";

type uploadProps = {};

const Upload: React.FC<uploadProps> = () => {
  const [imageConfirmed, setImageConfirmed] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageName, setImageName] = useState<string>("");

  return (
    <Flex
      direction="column"
      align="center"
      width="80%"
      m="0 auto"
      gap="2rem"
      height="100%"
    >
      {imageConfirmed ? (
        <PostDetails image={image} imageName={imageName} imageUrl={imageUrl} />
      ) : (
        <SelectImage
          setImageConfirmed={setImageConfirmed}
          setImage={setImage}
          setImageName={setImageName}
          setImageUrl={setImageUrl}
        />
      )}
    </Flex>
  );
};
export default Upload;

type SelectImageProps = {
  setImageConfirmed: (value: boolean) => void;
  setImage: (value: File | null) => void;
  setImageUrl: (value: string) => void;
  setImageName: (value: string) => void;
};

const SelectImage: React.FC<SelectImageProps> = ({
  setImage,
  setImageConfirmed,
  setImageName,
  setImageUrl,
}) => {
  const { image, imageSrc, imageName, onSelectImage, onReset, error } =
    useSelectImage();
  const inputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  const onContinue = () => {
    setImage(image!);
    setImageName(imageName);
    setImageUrl(imageSrc);
    setImageConfirmed(true);
  };

  useEffect(() => {
    if (error)
      toast({
        description: error,
        status: "error",
        position: "top",
        duration: 2000,
        isClosable: true,
      });
  }, [error]);
  return (
    <>
      <Heading fontSize={[25, 48]} mt={4} textAlign="center">
        Show us what are you made of
      </Heading>
      <Text fontSize={{ sm: 15, md: 20 }} fontWeight="light" textAlign="center">
        Upload your design. This will also be used as the thumbnail
      </Text>

      {image ? (
        <Box>
          <Image
            src={imageSrc}
            height="100%"
            width="100%"
            maxHeight="450px"
            maxWidth="850px"
          />
          <Flex align="center" justifyContent="center" gap="3rem" mt={8}>
            <Button onClick={onContinue}>Continue</Button>
            <Button variant="cancel" onClick={onReset}>
              Cancel
            </Button>
          </Flex>
        </Box>
      ) : (
        <Box
          border="1px dashed #4A4A4A"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          maxWidth="90%"
          width="820px"
          height="430px"
          borderRadius={20}
          gap="2rem"
          cursor={"pointer"}
          onClick={() => {
            inputRef.current?.click();
          }}
        >
          <input
            type="file"
            accept="image/x-png,image/gif,image/jpeg"
            hidden
            ref={inputRef}
            onChange={onSelectImage}
          />
          <Image src="/imagePlaceHolder.png" width="190px" />
          <Text fontSize={{ sm: 15, md: 20 }} fontWeight="light">
            Click to upolad your shot
          </Text>
        </Box>
      )}
    </>
  );
};

type PostDetailsProps = {
  image: File | null;
  imageUrl: string;
  imageName: string;
};

const PostDetails: React.FC<PostDetailsProps> = ({
  image,
  imageName,
  imageUrl,
}) => {
  const router = useRouter();
  const toast = useToast();
  const userData = useContext(UserContext);
  const appContext = useContext(AppContext);
  const { error, imageURL, uploadImage, loading } = useUploadImage();
  const [tags, setTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState<string>("");
  const [slug, setSlug] = useState<string>("");

  const handleSelectedItemsChange = (selectedItems?: Tag[]) => {
    if (selectedItems) {
      setTags(selectedItems);
    }
  };

  const onCreatePost = async () => {
    try {
      if (!title || title.length < 3 || title.length > 30) {
        throw new Error("Title must be between 3 and 30 characters");
      }
      if (!tags.length || tags.length >= 5) {
        throw new Error("Tags must be between 1 and 5");
      }

      const slug = encodeURI(
        title.replaceAll(" ", "").toLowerCase() + "-" + (await nanoid(5))
      );
      setSlug(slug);
      await uploadImage(image!, imageName, userData.user?.uid!, slug);
    } catch (error: any) {
      console.log("upload error", error.message);
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        position: "top",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    async function createPostAsync() {
      auth.currentUser
        ?.getIdToken(true)
        .then(async function (idToken) {
          await createPost(
            title,
            slug,
            imageURL,
            imageName,
            tags.map((tag) => tag.value),
            userData.user?.username!,
            userData.user?.displayName!,
            userData.user?.photoUrl
          );

          //posting to algolia
          const res = await axios.post(
            "/api/addPost",
            JSON.stringify({
              title,
              slug,
              imageUrl: imageURL,
              imageName,
              tags: tags.map((tag) => tag.value),
              username: userData.user?.username!,
              displayName: userData.user?.displayName!,
              photoUrl: userData.user?.photoUrl,
              idToken,
            }),
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          console.log("res", res);
        })
        .catch(function (error) {
          // Handle error
          console.log("error", error);
        });
    }

    if (imageURL) {
      try {
        createPostAsync();
        toast({
          description: "Post created successfully",
          status: "success",
          position: "top",
          duration: 2000,
          isClosable: true,
        });
        router.push(`/posts/${slug}`);
      } catch (error: any) {
        toast({
          title: "Error",
          description: "Error Creating Post",
          status: "error",
          position: "top",
          duration: 2000,
          isClosable: true,
        });
      }
    }
  }, [imageURL]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Error Uploading Image",
        status: "error",
        position: "top",
        duration: 2000,
        isClosable: true,
      });
    }
  }, [error]);

  return (
    <Flex direction="column" w="100%" my={8} gap={10}>
      <Input
        variant="title"
        placeholder="Give it a title"
        zIndex={1}
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setTitle(e.target.value);
        }}
      />
      <Flex justify="center">
        <Image
          src={imageUrl}
          width="100%"
          height="100%"
          maxHeight="500px"
          maxWidth="700px"
          borderRadius={15}
        />
      </Flex>
      <Flex direction="column">
        <CUIAutoComplete
          items={appContext?.tags!}
          placeholder={"pick a tag"}
          label={"Tags"}
          selectedItems={tags}
          onSelectedItemsChange={(changes) =>
            handleSelectedItemsChange(changes.selectedItems)
          }
          disableCreateItem
          hideToggleButton
          labelStyleProps={{
            fontSize: {
              sm: "18px",
              md: "26px",
            },
          }}
          listStyleProps={{
            maxHeight: "100px",
            overflowY: "scroll",
          }}
        />
        <Text fontSize={20}>
          Available{" "}
          <Link href="/tags" color="buttonColor">
            Tags
          </Link>
        </Text>
      </Flex>
      <Flex justifyContent="center" gap={8}>
        <Button onClick={onCreatePost} isLoading={loading}>
          Publish Post
        </Button>
        <Button
          variant="cancel"
          onClick={() => {
            router.push("/");
          }}
        >
          Cancel
        </Button>
      </Flex>
    </Flex>
  );
};
