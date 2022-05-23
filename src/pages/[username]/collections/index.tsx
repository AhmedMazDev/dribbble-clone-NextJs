import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { username } = context.query;

  return { props: { username } };
};

type IndexProps = {
  username: string;
};

const Index: React.FC<IndexProps> = ({ username }) => {
  const router = useRouter();

  useEffect(() => {
    router.push(`/${username}`);
  });

  return null;
};
export default Index;
