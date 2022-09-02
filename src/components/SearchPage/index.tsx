import { Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { Post, PostAlgolia } from "../../types/Post";
import { User, UserAlgolia } from "../../types/User";
import PostsList from "../PostsList";
import SearchBar from "./SearchBar";
import UsersList from "./UsersList";

type indexProps = {
  search: string;
  posts: Post[];
  users: User[];
};

const Index: React.FC<indexProps> = ({
  search,
  posts: ssrPosts,
  users: ssrUsers,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>(search);
  const [isSearchingForPosts, setIsSearchingForPosts] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>(ssrUsers);
  const [posts, setPosts] = useState<Post[]>(ssrPosts);

  const debouncedSearch = useDebounce<string>(searchTerm, 500);

  useEffect(() => {
    const fetchPosts = async () => {
      const allPosts = await axios.post("/api/getPosts", {
        search: searchTerm,
      });
      setPosts(allPosts.data.data);
    };

    const fetchUsers = async () => {
      const allUsers = await axios.post("/api/getUsers", {
        search: searchTerm,
      });
      setUsers(allUsers.data.data);
    };

    fetchPosts();
    fetchUsers();
  }, [debouncedSearch]);

  return (
    <Flex w="100%" direction={"column"}>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setIsSearchingForPosts={setIsSearchingForPosts}
      />
      {isSearchingForPosts ? (
        <Flex w="90%" m="0 auto">
          {posts.length > 0 ? (
            <PostsList posts={posts} />
          ) : (
            <Text>No posts</Text>
          )}
        </Flex>
      ) : (
        <Flex w="90%" m="0 auto">
          {users.length > 0 ? (
            <UsersList users={users} />
          ) : (
            <Text>No users</Text>
          )}
        </Flex>
      )}
    </Flex>
  );
};
export default Index;
