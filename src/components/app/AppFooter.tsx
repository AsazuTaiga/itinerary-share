import { Flex, Link, Text } from "@chakra-ui/react";

export const AppFooter = () => {
  return (
    <Flex
      as="footer"
      p="10"
      backgroundColor="teal.900"
      color="white"
      justify="center"
    >
      <Text>
        作者：<Link href="https://twitter.com/asazutaiga">@asazutaiga</Link>
        <br />
        ※お問い合わせいただいても対応できない場合がございます。ご了承下さい。
      </Text>
    </Flex>
  );
};
