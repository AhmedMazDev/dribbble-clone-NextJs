import { ComponentStyleConfig } from "@chakra-ui/react";

export const Input: ComponentStyleConfig = {
  baseStyle: {
    field: {
      bg: "inputColor",
      backgroundColor: "inputColor",
      _focus: {
        boxShadow: "none",
        outline: "none",
      },
    },
  },
  variants: {
    input: {
      field: {
        borderRadius: "18px",
      },
    },
    title: {
      field: {
        bg: "transparent",
        backgroundColor: "transparent",
        border: "none",
        fontSize: {
          sm: "18px",
          md: "26px",
        },
        fontWeight: "medium",
        color: "#4A4A4A",
        textColor: "#4A4A4A",
      },
    },
  },
};
