import React from "react";
import SearchPage from "../components/SearchPage";

import { GetServerSideProps } from "next";
import { Post, PostAlgolia } from "../types/Post";
import { User, UserAlgolia } from "../types/User";
import axios from "axios";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const search = ctx.query.search as string;

  let posts;
  let users;

  try {
    posts = await axios.post("api/getPosts", {
      search,
    });
    posts = posts.data.data;
    users = await axios.post("api/getUsers", {
      search,
    });
    users = users.data.data;
  } catch (e) {
    posts = [];
    users = [];
  }

  return {
    props: {
      search,
      posts: posts,
      users: users,
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
