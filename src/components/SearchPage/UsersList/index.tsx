import { Flex, Grid, Button } from "@chakra-ui/react";
import React from "react";
import { User } from "../../../types/User";
import PostItem from "../../PostsList/PostItem";
import UserDetails from "../../UserProfile/UserDetails";

interface Props {
  users: User[];
  loadMoreUsers?: () => void;
  isLoading?: boolean;
  hasMoreUsers?: boolean;
}

const Index: React.FC<Props> = ({
  users,
  hasMoreUsers,
  isLoading,
  loadMoreUsers,
}) => {
  return (
    <Flex direction={"column"} w="100%" gap={10}>
      <Grid
        templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        gridGap={"36px"}
        mt={8}
        w="100%"
        position={"relative"}
      >
        {users.map((user, i) => (
          <UserDetails user={user} key={i} />
        ))}
      </Grid>
      <Flex align="center" justify="center" my={4}>
        {hasMoreUsers && (
          <Button isLoading={isLoading} onClick={loadMoreUsers}>
            Load More
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default Index;
