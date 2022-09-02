import {
  Flex,
  Avatar,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  FormErrorMessage,
  Textarea,
  Box,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { updateUserProfile } from "../../../firebase/helpers/firestoreFunctions";
import useSelectFile from "../../../hooks/useSelectFile";
import useUploadImage from "../../../hooks/useUploadImage";
import { User } from "../../../types/User";

type indexProps = {
  user: User;
};

const Index: React.FC<indexProps> = ({ user }) => {
  const toast = useToast();
  const router = useRouter();
  const {
    onSelectImage,
    onReset,
    image,
    imageName,
    imageSrc,
    error: selectError,
  } = useSelectFile();
  const {
    uploadImage,
    imageURL,
    loading,
    error: uploadError,
  } = useUploadImage();
  const [userData, setUserData] = useState<
    Omit<User, "uid" | "email" | "username" | "createdAt">
  >({
    displayName: user.displayName,
    bio: user.bio || "",
    photoUrl: user.photoUrl,
    location: user.location || "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const imageInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setUserData({
      displayName: user.displayName,
      bio: user.bio || "",
      photoUrl: user.photoUrl,
      location: user.location || "",
    });
  }, [user]);

  useEffect(() => {
    console.log("imagesrc", imageSrc);
    console.log("image", image);
    console.log("imagename", imageName);
    console.log("error", selectError);
    if (imageSrc) {
      setUserData({ ...userData, photoUrl: imageSrc });
    }
  }, [imageSrc]);

  useEffect(() => {
    if (imageURL) {
      setUserData({ ...userData, photoUrl: imageURL });
    }
  }, [imageURL]);

  useEffect(() => {
    if (selectError) {
      toast({
        title: "Error",
        description: selectError,
        status: "error",
        position: "top",
        duration: 2000,
        isClosable: true,
      });
    }

    if (uploadError) {
      toast({
        title: "Error",
        description: "There was an error uploading the image",
        status: "error",
        position: "top",
        duration: 2000,
        isClosable: true,
      });
    }
  }, [selectError, uploadError]);

  const hanldeChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const onUploadImage = async () => {
    if (image) {
      uploadImage(image, imageName, user.uid);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      if (userData.displayName.length < 3) {
        throw new Error("Display name must be at least 3 characters");
      }

      await updateUserProfile({ uid: user.uid, ...userData });
      toast({
        title: "Success",
        description: "Profile updated successfully",
        status: "success",
        position: "top",
        duration: 2000,
        isClosable: true,
      });
      router.push(`/${user.username}`);
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error.message || "There was an error updating your profile",
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    }
    setIsLoading(false);
  };

  return (
    <>
      <Flex align="center" gap={4}>
        <Avatar src={userData.photoUrl} size="xl" />
        <Flex gap={4} direction={["column", "row"]}>
          <Input
            ref={imageInput}
            type={"file"}
            accept="image/x-png,image/gif,image/jpeg"
            hidden
            onChange={onSelectImage}
          />
          {image ? (
            <>
              <Button onClick={onUploadImage} isLoading={loading}>
                Upload Image
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => {
                  imageInput.current?.click();
                }}
                isLoading={isLoading}
              >
                Upload new picture
              </Button>
            </>
          )}
          <Button
            variant={"delete"}
            onClick={() => {
              setUserData({
                ...userData,
                photoUrl: "",
              });
              onReset();
            }}
            isLoading={loading || isLoading}
          >
            Delete
          </Button>
        </Flex>
      </Flex>
      <Flex direction={"column"} gap={8} mt={8}>
        <FormControl>
          <Flex w="100%" justify={"space-between"}>
            <FormLabel fontSize={20} fontWeight="bold">
              Display Name :
            </FormLabel>
            <Text fontSize={20} fontWeight="bold">
              {15 - userData.displayName.length}
            </Text>
          </Flex>
          <Input
            name="displayName"
            value={userData.displayName}
            onChange={hanldeChange}
            maxLength={15}
          />
          <FormErrorMessage></FormErrorMessage>
        </FormControl>
        <FormControl>
          <Flex w="100%" justify={"space-between"}>
            <FormLabel fontSize={20} fontWeight="bold">
              Location :
            </FormLabel>
            <Text fontSize={20} fontWeight="bold">
              {20 - userData.location!.length}
            </Text>
          </Flex>
          <Input
            name="location"
            onChange={hanldeChange}
            value={userData.location}
            maxLength={20}
          />
          <FormErrorMessage></FormErrorMessage>
        </FormControl>
        <FormControl>
          <Flex w="100%" justify={"space-between"}>
            <FormLabel fontSize={20} fontWeight="bold">
              Bio :
            </FormLabel>
            <Text fontSize={20} fontWeight="bold">
              {200 - userData.bio!.length}
            </Text>
          </Flex>
          <Textarea
            name="bio"
            onChange={hanldeChange}
            bg={"#EAEAEA"}
            value={userData.bio}
            maxLength={200}
            resize="none"
          />
          <FormErrorMessage></FormErrorMessage>
        </FormControl>
      </Flex>
      <Box mt={8}>
        <Button onClick={handleSubmit} isLoading={isLoading || loading}>
          Save Changes
        </Button>
      </Box>
    </>
  );
};
export default Index;
