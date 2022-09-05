import { InputGroup, InputLeftElement, Input, Flex } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { useRouter } from "next/router";

type SearchInputProps = {};

const SearchInput: React.FC<SearchInputProps> = () => {
  const [search, setSearch] = useState<string>("");

  const router = useRouter();

  return (
    <form
      style={{
        display: "flex",
        alignItems: "center",
      }}
      onSubmit={(e) => {
        e.preventDefault();
        router.push({
          pathname: "/search",
          query: {
            search,
          },
        });
        setSearch("");
      }}
    >
      <InputGroup display={{ base: "none", md: "unset" }} mr={4}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          type="search"
          placeholder="Search"
          width="80%"
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearch(e.target.value);
          }}
        />
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
        onClick={() => {
          router.push({
            pathname: "/search",
            query: {
              search,
            },
          });
        }}
      />
    </form>
  );
};
export default SearchInput;
