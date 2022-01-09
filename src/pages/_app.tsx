import { ChakraProvider, Container, Spacer } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { AppFooter } from "../components/app/AppFooter";
import { AppHeader } from "../components/app/AppHeader";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AppHeader />
      <Container pt={100} maxW="container.md" as="main">
        <Component {...pageProps} />
      </Container>
      <Spacer height="50"></Spacer>
      <AppFooter />
    </ChakraProvider>
  );
}

export default MyApp;
