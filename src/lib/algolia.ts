import algoliasearch from "algoliasearch";

const algoliaClient = algoliasearch(
  process.env.ALGOLIA_APP_ID as string,
  process.env.ALGOLIA_API_KEY as string
);

export const postIndex = algoliaClient.initIndex("posts");
export const usersIndex = algoliaClient.initIndex("users");
