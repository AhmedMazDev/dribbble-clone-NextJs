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
  },
};
