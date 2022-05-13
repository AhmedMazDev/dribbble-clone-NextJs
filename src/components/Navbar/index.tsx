import { Flex } from "@chakra-ui/react";
import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import LeftContent from "./LeftContent";
import RightContent from "./RightContent";

type indexProps = {};

const index: React.FC<indexProps> = () => {
  const userData = useContext(UserContext);
  return (
    <Flex
      height="80px"
      padding="6px 12px"
      borderBottom={"1px solid #718096"}
      bg="white"
      position="sticky"
      top="0"
      width="100%"
      zIndex={99}
    >
      <Flex width="90%" alignItems="center" justify="space-between" m="0 auto">
        <LeftContent />
        <RightContent user={userData.user} />
      </Flex>
    </Flex>
  );
};
export default index;
