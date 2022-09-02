import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext/appContext";
import groupBy from "lodash.groupby";
import { Tag } from "../../types/AppContext";
import { Dictionary } from "lodash";
import { useRouter } from "next/router";

const Index: NextPage = () => {
  const router = useRouter();
  const { tags } = useContext(AppContext);
  const [tagsList, setTagsList] = useState<Dictionary<Tag[]>>();

  useEffect(() => {
    if (tags) {
      const groupedTags = groupBy(tags, (tags) => tags.label.charAt(0));
      setTagsList(groupedTags);
    }
  }, [tags]);

  return (
    <>
      <Flex
        w={"90%"}
        m="0 auto"
        mt={8}
        align="center"
        justify={"center"}
        direction="column"
      >
        <Text fontSize={30} fontWeight="bold">
          Available Tags
        </Text>
        <Flex mt={8} direction={"column"} w="90%">
          {tagsList &&
            Object.keys(tagsList).map((key) => {
              return (
                <Flex key={key} direction="column" w="100%">
                  <Divider borderWidth={"1px"} />
                  <Flex w="100%" my={4}>
                    <Text fontSize={30} fontWeight="bold" w="10%">
                      {key}
                    </Text>
                    <Flex direction={"column"} w="80%" gap={2}>
                      {tagsList[key].map((tag) => {
                        return (
                          <Flex
                            key={tag.label}
                            w="100%"
                            h="50px"
                            borderRadius={15}
                            bg="#EAEAEA"
                            _hover={{ bg: "#C4C4C4" }}
                            align="center"
                            cursor={"pointer"}
                            onClick={() => {
                              router.push(`/tags/${tag.label}`);
                            }}
                          >
                            <Text fontSize={20} ml={4}>
                              {tag.value}
                            </Text>
                          </Flex>
                        );
                      })}
                    </Flex>
                  </Flex>
                </Flex>
              );
            })}
        </Flex>
      </Flex>
    </>
  );
};
export default Index;
