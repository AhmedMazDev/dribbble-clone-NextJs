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
import { User } from "../../types/User";
import UserAbout from "./UserAbout";
import UserCollections from "./UserCollections";
import UserDetails from "./UserDetails";
import UserLikedPosts from "./UserLikedPosts";
import UserPosts from "./UserPosts";

type indexProps = {
  user: User;
};

const Index: React.FC<indexProps> = ({ user }) => {
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
          <Tab
            _focus={{
              outline: "none",
              boxShadow: "none",
            }}
          >
            About
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <UserPosts user={user} />
          </TabPanel>
          <TabPanel>
            <UserCollections user={user} />
          </TabPanel>
          <TabPanel>
            <UserLikedPosts user={user} />
          </TabPanel>
          <TabPanel>
            <UserAbout user={user} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};
export default Index;
