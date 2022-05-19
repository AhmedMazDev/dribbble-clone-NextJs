import { Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { User } from "../../../interfaces/User";
import { GoLocation } from "react-icons/go";
import { FaBirthdayCake } from "react-icons/fa";
import moment from "moment";

type indexProps = {
  user: User;
};

const index: React.FC<indexProps> = ({ user }) => {
  return (
    <>
      <Flex
        width="70%"
        justify="space-between"
        mt={4}
        gap={4}
        direction={["column", "row"]}
      >
        <Flex direction="column">
          <Text fontSize={25} fontWeight="bold">
            Biography
          </Text>
          <Text fontSize={18} fontWeight="medium">
            {user.bio || `this user doesn't have a bio yet`}
          </Text>
        </Flex>
        <Flex
          borderRadius={10}
          background="#EAEAEA"
          padding={4}
          direction="column"
          gap={4}
        >
          <Flex align={"center"} gap={4}>
            <Icon as={GoLocation} w={8} h={8} />
            <Text fontSize={20} fontWeight="medium">
              {user.location || "Unknown"}
            </Text>
          </Flex>
          <Flex align={"center"} gap={4}>
            <Icon as={FaBirthdayCake} w={8} h={8} />
            <Text fontSize={20} fontWeight="medium">
              Member since {moment(user.createdAt).format("MMM YYYY")}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
export default index;
