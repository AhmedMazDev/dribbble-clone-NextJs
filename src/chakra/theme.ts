import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css";
import "@fontsource/rubik/300.css";
import "@fontsource/rubik/400.css";
import "@fontsource/rubik/700.css";
import "@fontsource/birthstone-bounce";
import "@fontsource/birthstone-bounce/400.css";
import "@fontsource/birthstone-bounce/500.css";

import { extendTheme } from "@chakra-ui/react";
import { Button } from "./components/button";
import { Input } from "./components/input";

const fonts = { heading: "Rubik, sans-serif", body: "Roboto, sans-serif" };
const colors = {
  textColor: "#4A4A4A",
  buttonColor: "#3AA4FF",
  inputColor: "#EAEAEA",
};

export const theme = extendTheme({
  colors,
  fonts,
  styles: {
    global: () => ({
      body: {
        bg: "#F8F8F8",
        color: colors.textColor,
      },
    }),
  },
  components: {
    Button,
    Input,
  },
});
