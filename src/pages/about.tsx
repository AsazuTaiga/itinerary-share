import {
  Heading,
  Stack,
  Image,
  Text,
  Box,
  Circle,
  HStack,
} from "@chakra-ui/react";

const About = () => (
  <Stack gap={10} align="center">
    <Heading
      as="h1"
      fontSize="6xl"
      bgGradient="linear(to-r, teal.400, pink.200)"
      bgClip="text"
    >
      旅程をさっと作って、シェアしましょう！
    </Heading>
    <Image maxW="xs" src="/trip.svg" alt="" />
    <Text>
      旅程シェアは、簡単3ステップで旅程を作成して、LINEメッセージで参加者にシェアできるサービスです。
    </Text>
    <HStack>
      <Circle size="8" bgColor="teal.500" color="white">
        1
      </Circle>
      <Text>旅のテーマを決める</Text>
    </HStack>

    <HStack>
      <Circle size="8" bgColor="teal.500" color="white">
        2
      </Circle>
      <Text>参加者を追加する</Text>
    </HStack>

    <HStack>
      <Circle size="8" bgColor="teal.500" color="white">
        3
      </Circle>
      <Text>詳細行程を入力する</Text>
    </HStack>

    <Text>
      あとは「LINEでシェア」をぽちっとするだけ！
      <br />
      LINE以外のメッセンジャーアプリを使っている人や、メールで共有したい人は、「クリップボードにコピー」を使用してください！
    </Text>
  </Stack>
);

export default About;
