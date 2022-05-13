import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { theme } from "../chakra/theme";
import AuthModal from "../components/Modals/AuthModal";
import Navbar from "../components/Navbar";
import AppContextProvider from "../context/AppContext/AppContextProvider";
import { UserContext } from "../context/userContext";
import { useUserData } from "../hooks/useUserData";
import { UserContext as userContext } from "../interfaces/User";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const userData = useUserData();

  return (
    <UserContext.Provider value={userData as userContext}>
      <AppContextProvider>
        <ChakraProvider theme={theme}>
          <AuthModal />
          {router.pathname !== "/signin" && router.pathname !== "/signup" && (
            <Navbar />
          )}
          <Component {...pageProps} />
        </ChakraProvider>
      </AppContextProvider>
    </UserContext.Provider>
  );
}

export default MyApp;
