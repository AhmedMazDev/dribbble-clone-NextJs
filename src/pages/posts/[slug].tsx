import { GetServerSidePropsContext } from "next";
import React from "react";
import { getPostBySlug } from "../../firebase/helpers/firestoreFunctions";
import { Post } from "../../types/Post";
import PostPage from "../../components/PostPage";
import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "../../firebase/firebaseConfig";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const slug = context.query.slug as string;

  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
}

type PostProps = {
  post: Post;
};

const Post: React.FC<PostProps> = ({ post }) => {
  const [postValue] = useDocumentData(doc(db, `posts/${post.slug}`));
  const realtimePost = (postValue as Post) || post;

  return <PostPage post={realtimePost} />;
};
export default Post;
