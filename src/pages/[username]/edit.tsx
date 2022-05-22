import { Flex, Spinner, Text } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import EditProfileForm from "../../components/UserProfile/EditProfileForm";
import { UserContext } from "../../context/userContext";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { username } = context.query;
  return {
    props: {
      username: username as string,
    },
  };
};

type Props = {
  username: string;
};

const Edit: React.FC<Props> = ({ username }) => {
  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!user || user.username !== username) {
      router.push("/");
    }
  }, [user]);

  if (!user || user.username !== username) {
    return (
      <Flex width={"100%"} align="center" justify="center" mt={8}>
        <Spinner size={"lg"} />
      </Flex>
    );
  }

  return (
    <Flex w={"90%"} m="0 auto" gap={8} mt={8} direction="column">
      <Flex align={"center"} gap={4}>
        <Flex direction={"column"}>
          <Flex>
            <Text
              fontSize={[20, 25]}
              fontWeight="bold"
              cursor={"pointer"}
              onClick={() => {
                router.push(`/${username}`);
              }}
            >
              {user.displayName}
            </Text>
            <Text fontSize={[20, 25]} mx={2} color="#DDDBDE">
              /
            </Text>
            <Text fontSize={[20, 25]} fontWeight="bold">
              Edit Profile
            </Text>
          </Flex>
          <Text>edit your profile informations</Text>
        </Flex>
      </Flex>
      <Flex w="90%" m="0 auto" direction={"column"}>
        <EditProfileForm user={user} />
      </Flex>
    </Flex>
  );
};
export default Edit;
