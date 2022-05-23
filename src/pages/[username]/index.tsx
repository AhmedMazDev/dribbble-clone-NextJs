import { GetServerSideProps, NextPage } from "next";
import React from "react";
import UserProfile from "../../components/UserProfile";
import { getUserByUsername } from "../../firebase/helpers/firestoreFunctions";
import { User } from "../../interfaces/User";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const username = context.query.username;

  const user = await getUserByUsername(username as string);

  if (!user) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      user,
    },
  };
};

type Props = {
  user: User;
};

const Index: NextPage<Props> = ({ user }) => {
  return (
    <>
      <UserProfile user={user} />
    </>
  );
};
export default Index;
