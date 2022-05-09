import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { theme } from "../chakra/theme";
import Navbar from "../components/Navbar";
import { UserContext } from "../context/userContext";
import { useUserData } from "../hooks/useUserData";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { user } = useUserData();

  return (
    <UserContext.Provider value={user}>
      <ChakraProvider theme={theme}>
        {router.pathname !== "/signin" && router.pathname !== "/signup" && (
          <Navbar />
        )}
        <Component {...pageProps} />
      </ChakraProvider>
    </UserContext.Provider>
  );
}

export default MyApp;
