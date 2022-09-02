import React from "react";
import SearchPage from "../components/SearchPage";

import { GetServerSideProps } from "next";
import { postIndex, usersIndex } from "../lib/algolia";
import { Post, PostAlgolia } from "../types/Post";
import { User, UserAlgolia } from "../types/User";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const search = ctx.query.search as string;

  const posts = await postIndex.search(search);
  const users = await usersIndex.search(search);

  return {
    props: {
      search,
      posts: posts.hits,
      users: users.hits,
    },
  };
};

type SearchProps = {
  search: string;
  posts: Post[];
  users: User[];
};

const Search: React.FC<SearchProps> = ({ search, posts, users }) => {
  return <SearchPage search={search} users={users} posts={posts} />;
};
export default Search;
