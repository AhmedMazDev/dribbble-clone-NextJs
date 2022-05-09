import {
  Flex,
  Button,
  Text,
  Avatar,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverCloseButton,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { User } from "../../interfaces/User";
import SearchInput from "./SearchInput";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

type RightContentProps = {
  user: User | null;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {
  return (
    <Flex align={"center"}>
      <SearchInput />
      {user ? <UserSignedIn user={user} /> : <UserSignedOut />}
    </Flex>
  );
};
export default RightContent;

function UserSignedOut({}) {
  const router = useRouter();
  return (
    <>
      <Text
        mr={8}
        cursor="pointer"
        whiteSpace="nowrap"
        onClick={() => {
          router.push("/signin");
        }}
      >
        Log In
      </Text>
      <Button
        onClick={() => {
          router.push("/signup");
        }}
      >
        Sign Up
      </Button>
    </>
  );
}

type UserSignedInProps = {
  user: User | null;
};

const UserSignedIn: React.FC<UserSignedInProps> = ({ user }) => {
  const router = useRouter();
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Avatar src={user?.photoUrl} h={10} w={10} cursor="pointer" />
        </PopoverTrigger>
        <PopoverContent
          width={150}
          bg="white"
          borderRadius={25}
          border="none"
          boxShadow="2xl"
          _focus={{ boxShadow: "none" }}
          zIndex={99}
        >
          <Button
            bg="white"
            color="textColor"
            _hover={{ bg: "buttonColor", color: "white" }}
            borderBottomRadius="none"
            onClick={() => {
              router.push(`/${user?.username}`);
            }}
          >
            Profile
          </Button>
          <Button
            bg="white"
            color="textColor"
            _hover={{ bg: "buttonColor", color: "white" }}
            borderTopRadius="none"
            onClick={() => {
              signOut(auth);
            }}
          >
            Sign Out
          </Button>
        </PopoverContent>
      </Popover>

      <Button
        ml={4}
        onClick={() => {
          router.push("/upload");
        }}
      >
        Upload
      </Button>
    </>
  );
};
