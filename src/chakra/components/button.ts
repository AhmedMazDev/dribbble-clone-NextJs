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
  },
};
