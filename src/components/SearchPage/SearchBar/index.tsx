import { PhoneIcon, Search2Icon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Text,
} from "@chakra-ui/react";
import React from "react";

type indexProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  setIsSearchingForPosts: (value: boolean) => void;
};

const Index: React.FC<indexProps> = ({
  searchTerm,
  setSearchTerm,
  setIsSearchingForPosts,
}) => {
  return (
    <Flex direction={"column"} w="100%">
      <Flex
        h="50vh"
        backgroundImage={"url(./search-cover.png)"}
        backgroundRepeat="no-repeat"
        backgroundPosition="center center"
        backgroundSize={"cover"}
        align="center"
        justify="center"
      >
        <Text
          color="white"
          fontSize={[25, 50]}
          fontWeight="bold"
          textAlign={"center"}
        >
          Find best shots from thousands images
        </Text>
      </Flex>
      <Flex
        w={["90%", "60%"]}
        align="center"
        justify={"center"}
        transform="translateY(-50%)"
        m="0 auto"
        background={"white"}
        borderRadius={20}
        paddingY={[4, 6]}
        paddingX={4}
        boxShadow="0px 4px 20px rgba(0, 0, 0, 0.12)"
        gap={4}
      >
        <InputGroup size="lg">
          <InputLeftElement pointerEvents="none">
            <Search2Icon w={[4, 6]} h={[4, 6]} color="textColor" />
          </InputLeftElement>
          <Input
            type="search"
            placeholder="Search..."
            variant="input"
            backgroundColor={"white"}
            fontSize={["16", "26"]}
            ml={[0, 4]}
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchTerm(e.target.value);
            }}
          />
        </InputGroup>
        <Divider
          orientation="vertical"
          border="1px solid #4A4A4A"
          borderColor="#4A4A4A"
        />
        <Select
          w={["60%", "20%"]}
          variant="unstyled"
          fontSize={[16, 22]}
          fontWeight="bold"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            if (e.target.value === "posts") setIsSearchingForPosts(true);
            else setIsSearchingForPosts(false);
          }}
        >
          <option value="posts">Posts</option>
          <option value="members">Members</option>
        </Select>
      </Flex>
    </Flex>
  );
};
export default Index;
