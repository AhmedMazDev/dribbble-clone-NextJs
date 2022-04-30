import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import React from "react";

type SearchInputProps = {};

const SearchInput: React.FC<SearchInputProps> = () => {
  return (
    <>
      <InputGroup display={{ base: "none", md: "unset" }} mr={4}>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input type="text" placeholder="Search" width="80%" />
      </InputGroup>
      <SearchIcon
        cursor={"pointer"}
        display={{ base: "unset", md: "none" }}
        w={10}
        h={10}
        color="gray.500"
        mr={4}
        border="1px solid gray"
        borderRadius={10}
        padding={2}
      />
    </>
  );
};
export default SearchInput;
