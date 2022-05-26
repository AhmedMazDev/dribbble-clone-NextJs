import { ComponentStyleConfig } from "@chakra-ui/react";

export const Button: ComponentStyleConfig = {
  baseStyle: {
    _focus: {
      boxShadow: "none",
    },
  },
  variants: {
    solid: {
      bg: "buttonColor",
      color: "white",
      fontWeight: "300",
      fontsize: "14px",
      borderRadius: "10px",
      _hover: {
        bg: "#6EB5F2",
      },
    },
    white: {
      bg: "white",
      color: "buttonColor",
      border: "2px solid #3AA4FF",
      borderRadius: "10px",
      _hover: {
        bg: "whitealpha.50",
      },
    },
    outline: {
      bg: "white",
      color: "textColor",
      border: "2px solid #3AA4FF",
      borderRadius: "10px",
    },
    cancel: {
      bg: "white",
      color: "textColor",
      border: "1px solid #3AA4FF",
      fontWeight: "400",
      fontFamily: "Rubik",
      borderRadius: "10px",
      _hover: {
        bg: "gray.100",
      },
    },
    delete: {
      bg: "white",
      color: "#ff0e0e",
      border: "1px solid #ff0e0e",
      fontWeight: "400",
      fontFamily: "Rubik",
      borderRadius: "10px",
      _hover: {
        bg: "gray.100",
      },
    },
  },
};
