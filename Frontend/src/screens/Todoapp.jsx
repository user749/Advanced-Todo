import React from "react";
import {
  Box,
  Heading,
  VStack,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import AddTodo from "../components/AddItem";

export const TodoScreen = () => {
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const dividerColor = useColorModeValue("gray.200", "gray.600");

  return (
    <VStack
      spacing={4}
      width="100%"
      height="full"
      p={10}
      alignItems="center"
      justifyContent="center"
      bg={bgColor}
    >
      <VStack
        spacing={6}
        width="100%"
        maxW="auto"
        p={10}
        borderRadius="xl"
        boxShadow="lg"
        bg="white"
        divider={<Divider borderColor={dividerColor} />}
      >
        <Heading size="lg" textAlign="center">
          Todo List
        </Heading>
        <AddTodo />
      </VStack>
    </VStack>
  );
};
