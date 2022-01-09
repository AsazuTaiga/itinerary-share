import {
  AddIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  ChatIcon,
  CloseIcon,
  CopyIcon,
} from "@chakra-ui/icons";
import {
  Heading,
  Stack,
  Text,
  Button,
  Input,
  Flex,
  IconButton,
  Link,
  Box,
  Textarea,
  Spacer,
  Circle,
  HStack,
} from "@chakra-ui/react";
import { FieldArray, Formik } from "formik";
import type { NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { JaConfig } from "../config/chakra-dayzed-datepicker-ja";
import { useState } from "react";

type Schedule = {
  locationName: string;
  date: Date;
  description: string;
};

const initialSchedule: Schedule = {
  locationName: "",
  date: new Date(),
  description: "",
};

type FormValues = {
  theme: string;
  party: string[];
  schedules: Schedule[];
};

const formatValues = (values: FormValues) => {
  const { party, theme, schedules } = values;
  const partyText = party.join("、");
  const schedulesText = schedules
    .map((schedule, index) => {
      const { locationName, date, description } = schedule;
      const dateText = date.toLocaleDateString();
      const descriptionText = description.replace(/\n/g, " ");
      return `　(${index + 1})
　場所：${locationName}
　日付:${dateText}
${descriptionText ? `　説明：${descriptionText}` : ""}
`;
    })
    .join("\n");
  return `旅程シェア（https://itineraryshare.com）で旅程を作成したよ！
 
旅のテーマ：${theme}
参加者：${partyText}

予定の詳細
${schedulesText}`;
};

const Home: NextPage = () => {
  const [copied, setCopied] = useState(false);
  return (
    <>
      <Head>
        <title>旅程シェア</title>
        <meta
          name="description"
          content="旅程をさっと作ってシェアしましょう！"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack gap={6}>
        <Text lineHeight={2}>
          <NextLink href="/about" passHref>
            <Link color="teal.600">旅程シェアとは？</Link>
          </NextLink>
        </Text>
        <Formik
          initialValues={{
            party: [""],
            theme: "",
            schedules: [initialSchedule],
          }}
          onSubmit={() => void 0}
        >
          {({ values, handleChange, handleBlur, setFieldValue }) => (
            <form>
              <Stack gap={10}>
                <Stack gap={2}>
                  <Heading as="h2" size="lg">
                    旅のテーマ
                  </Heading>
                  <Text>今回の旅を、一言で表すと？</Text>
                  <Input
                    name="theme"
                    placeholder="例）ちょっと足をのばして日帰り温泉旅行！"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.theme}
                  />
                </Stack>
                <Stack gap={2}>
                  <Heading as="h2" size="lg">
                    参加者
                  </Heading>
                  <Text>旅行に参加する人を追加してください。</Text>
                  <FieldArray
                    name="party"
                    render={(arrayHelpers) => (
                      <Stack gap={2}>
                        {values.party.map((party, index) => (
                          <Flex key={index}>
                            <Input
                              name={`party[${index}]`}
                              placeholder="参加者の名前"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={party}
                            />
                            <IconButton
                              aria-label="削除"
                              color="red.300"
                              bgColor="white"
                              onClick={() => arrayHelpers.remove(index)}
                              disabled={values.party.length === 1}
                            >
                              <CloseIcon />
                            </IconButton>
                          </Flex>
                        ))}
                        <Button
                          onClick={() => arrayHelpers.push("")}
                          leftIcon={<AddIcon />}
                        >
                          参加者を追加
                        </Button>
                        {values.party.length > 9 ? (
                          <Text>
                            大人数のご旅行ですね…！　幹事は大変そうですが、楽しんでください。
                          </Text>
                        ) : null}
                      </Stack>
                    )}
                  ></FieldArray>
                </Stack>
                <Stack gap={2}>
                  <Heading as="h2" size="lg">
                    詳細行程
                  </Heading>
                  <Text>
                    最初に集合場所、最後に解散場所をしっかり書くのがおすすめです。
                  </Text>
                  <FieldArray name="schedules">
                    {(arrayHelpers) => (
                      <Stack gap={2}>
                        {values.schedules.map((schedule, index) => (
                          <Box
                            p={6}
                            border="1px"
                            borderColor="gray.200"
                            rounded="lg"
                            key={index}
                          >
                            <Stack gap={2}>
                              <HStack>
                                <Circle size={8} bg="teal.400" color="white">
                                  {index + 1}
                                </Circle>
                                <Button
                                  disabled={index === 0}
                                  onClick={() =>
                                    arrayHelpers.swap(index, index - 1)
                                  }
                                  leftIcon={<ArrowUpIcon />}
                                >
                                  順序を上へ
                                </Button>
                                <Button
                                  disabled={
                                    index === values.schedules.length - 1
                                  }
                                  onClick={() =>
                                    arrayHelpers.swap(index, index + 1)
                                  }
                                  rightIcon={<ArrowDownIcon />}
                                >
                                  順序を下へ
                                </Button>

                                <Spacer />
                                <IconButton
                                  aria-label="削除"
                                  color="red.300"
                                  bgColor="white"
                                  onClick={() => arrayHelpers.remove(index)}
                                  disabled={values.schedules.length === 1}
                                >
                                  <CloseIcon />
                                </IconButton>
                              </HStack>
                              <Heading as="h3" size="md">
                                場所
                              </Heading>
                              <Input
                                name={`schedules[${index}].locationName`}
                                placeholder="駅名・施設名・住所など"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={schedule.locationName}
                              />
                              <Heading as="h3" size="md">
                                日付
                              </Heading>
                              <SingleDatepicker
                                date={schedule.date}
                                onDateChange={(date) =>
                                  setFieldValue(
                                    `schedules[${index}].date`,
                                    date
                                  )
                                }
                                configs={JaConfig}
                              />
                              <Heading as="h3" size="md">
                                メモなど
                              </Heading>
                              <Textarea
                                name={`schedules[${index}].description`}
                                placeholder=""
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={schedule.description}
                              />
                            </Stack>
                          </Box>
                        ))}
                        <Button
                          onClick={() => arrayHelpers.push(initialSchedule)}
                          leftIcon={<AddIcon />}
                        >
                          詳細行程を追加
                        </Button>
                      </Stack>
                    )}
                  </FieldArray>
                </Stack>
                <Stack>
                  <Button
                    size="lg"
                    bgColor="#06C755"
                    color="white"
                    leftIcon={<ChatIcon />}
                    onClick={() => {
                      const formatted = formatValues(values);
                      const encoded = encodeURIComponent(formatted);
                      window.open(`https://line.me/R/msg/text/?${encoded}`);
                    }}
                  >
                    LINEでシェア
                  </Button>
                  <Flex justify="center">または</Flex>
                  <Button
                    size="lg"
                    bgColor="teal.400"
                    color="white"
                    leftIcon={<CopyIcon />}
                    onClick={() => {
                      const formatted = formatValues(values);
                      navigator.clipboard.writeText(formatted);
                      setCopied(true);
                    }}
                  >
                    {copied ? "コピーしました！" : "クリップボードにコピー"}
                  </Button>
                </Stack>
              </Stack>
            </form>
          )}
        </Formik>
        <Spacer></Spacer>
      </Stack>
    </>
  );
};

export default Home;
