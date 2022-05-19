import { Avatar, Button, Flex, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { UserContext } from "../../../context/userContext";
import { User } from "../../../interfaces/User";

type indexProps = {
  user: User;
};

const index: React.FC<indexProps> = ({ user }) => {
  const { user: userData } = useContext(UserContext);
  const router = useRouter();
  return (
    <Flex align="center" justify="center" width="100%" gap={4}>
      <Avatar src={user.photoUrl} size="xl" />
      <Flex direction="column">
        <Text fontSize={30} fontWeight="bold">
          {user.displayName}
        </Text>
        {user.location && <Text fontSize={18}>{user.location}</Text>}
        {user.uid === userData?.uid && (
          <Flex>
            <Button
              bg="transparent"
              color="textColor"
              border="0.5px solid #C4C4C4"
              fontWeight={"medium"}
              _hover={{ bg: "#C4C4C4" }}
              onClick={() => {
                router.push(`${user.username}/edit`);
              }}
            >
              Edit Profile
            </Button>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
export default index;
