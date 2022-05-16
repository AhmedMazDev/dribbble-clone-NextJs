import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { User } from "../../interfaces/User";
import UserCollections from "./UserCollections";
import UserDetails from "./UserDetails";
import UserPosts from "./UserPosts";

type indexProps = {
  user: User;
};

const index: React.FC<indexProps> = ({ user }) => {
  return (
    <Flex w="90%" m="0 auto" mt={8} direction="column" gap={8}>
      <UserDetails user={user} />
      <Tabs size={"lg"}>
        <TabList>
          <Tab
            _focus={{
              outline: "none",
              boxShadow: "none",
            }}
          >
            Posts
          </Tab>
          <Tab
            _focus={{
              outline: "none",
              boxShadow: "none",
            }}
          >
            Collections
          </Tab>
          <Tab
            _focus={{
              outline: "none",
              boxShadow: "none",
            }}
          >
            Liked Posts
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <UserPosts user={user} />
          </TabPanel>
          <TabPanel>
            <UserCollections user={user} />
          </TabPanel>
          <TabPanel>{/* <UserLikedPosts /> */}</TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};
export default index;
