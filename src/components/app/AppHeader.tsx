import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Menu,
  MenuItem,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  PlusSquareIcon,
  QuestionIcon,
  WarningIcon,
} from "@chakra-ui/icons";
import { createRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export const AppHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const buttonRef = createRef<HTMLButtonElement>();
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      onClose();
    };

    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router]);

  return (
    <>
      <Flex
        as="header"
        position="fixed"
        w="100%"
        p="1"
        borderBottom="1px"
        borderColor="gray.200"
        bgGradient="to"
        bg="white"
        zIndex={1000}
      >
        <IconButton
          aria-label="メニュー"
          icon={<HamburgerIcon />}
          ref={buttonRef}
          onClick={onOpen}
          position="absolute"
        />
        <Spacer />
        <Link href="/" passHref>
          <Text as="a" fontSize="2xl" color="teal.400" fontWeight="black">
            旅程シェア
          </Text>
        </Link>
        <Spacer />
      </Flex>

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={buttonRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>メニュー</DrawerHeader>

          <DrawerBody>
            <Menu>
              <Link href="/" passHref>
                <MenuItem icon={<PlusSquareIcon />} color="teal.600">
                  旅程を作成する
                </MenuItem>
              </Link>
              <Link href="/about" passHref>
                <MenuItem icon={<QuestionIcon />}>旅程シェアとは？</MenuItem>
              </Link>
              <Link href="/terms" passHref>
                <MenuItem icon={<WarningIcon />}>利用規約</MenuItem>
              </Link>
            </Menu>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
