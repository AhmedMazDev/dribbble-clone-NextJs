import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { CUIAutoComplete } from "chakra-ui-autocomplete";
import useSelectImage from "../hooks/useSelectFile";
import { useRouter } from "next/router";

type uploadProps = {};

const upload: React.FC<uploadProps> = () => {
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
      {image ? (
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
export default upload;

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
      <Heading fontSize={{ sm: "30px", md: 48 }} mt={4}>
        Show us what are you made of
      </Heading>
      <Text fontSize={{ sm: 15, md: 20 }} fontWeight="light">
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

const list = [
  { label: "Nature", value: "Nature" },
  { label: "People", value: "People" },
  { label: "Animals", value: "Animals" },
  { label: "Food", value: "Food" },
  { label: "Technology", value: "Technology" },
  { label: "Fashion", value: "Fashion" },
  { label: "Culture", value: "Culture" },
  { label: "Art", value: "Art" },
  { label: "Music", value: "Music" },
  { label: "Sports", value: "Sports" },
  { label: "Travel", value: "Travel" },
  { label: "Fashion", value: "Fashion" },
  { label: "Culture", value: "Culture" },
  { label: "Art", value: "Art" },
  { label: "Music", value: "Music" },
  { label: "Sports", value: "Sports" },
];

interface Item {
  label: string;
  value: string;
}

const PostDetails: React.FC<PostDetailsProps> = ({
  image,
  imageName,
  imageUrl,
}) => {
  const router = useRouter();
  const [tags, setTags] = useState<Item[]>([]);

  const handleSelectedItemsChange = (selectedItems?: Item[]) => {
    if (selectedItems) {
      setTags(selectedItems);
    }
  };

  const onCreatePost = () => {};

  return (
    <Flex direction="column" w="100%" my={8} gap={10}>
      <Input variant="title" placeholder="Give it a title" zIndex={1} />
      <Flex justify="center">
        <Image
          src={imageUrl}
          width="100%"
          height="100%"
          maxHeight="400px"
          maxWidth="600px"
          borderRadius={15}
        />
      </Flex>
      <Flex direction="column">
        {/* <Text fontSize={{ sm: "18px", md: "26px" }} color="#4A4A4A">
          Tags
        </Text> */}
        <CUIAutoComplete
          items={list}
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
        />
      </Flex>
      <Flex justifyContent="center" gap={8}>
        <Button onClick={onCreatePost}>Publish Post</Button>
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
