import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Spacer,
  Button,
  HStack,
  IconButton,
  VStack,
  Text,
  Icon,
  Container,
} from "@chakra-ui/react";
import {
  FaHome,
  FaCode,
  FaBriefcase,
  FaCog,
  FaGamepad,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useColorModeValue } from "./ui/color-mode";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const onToggle = () => setIsOpen(!isOpen);

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const brandColor = useColorModeValue("blue.600", "blue.400");
  const hoverBg = useColorModeValue("gray.100", "gray.700");

  const navigationItems = [
    { name: "ホーム", path: "/", icon: FaHome },
    { name: "作品一覧", path: "/production", icon: FaCode },
    { name: "キャリア", path: "/career", icon: FaBriefcase },
    { name: "技術スタック", path: "/skill", icon: FaCog },
    { name: "趣味", path: "/hobby", icon: FaGamepad },
  ];

  const isActiveRoute = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Box
      as="header"
      bg={bgColor}
      borderBottom="1px solid"
      borderColor={borderColor}
      boxShadow="md"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={9999}
      w="100vw"
      h={{ base: "60px", md: "70px" }}
    >
      <Box maxW="1400px" mx="auto" h="100%">
        <Flex
          alignItems="center"
          justify="space-between"
          h="100%"
          px={{ base: 4, md: 6 }}
        >
          {/* ロゴ・ブランド名 */}
          <Flex alignItems="center">
            <Link to="/">
              <HStack
                spacing={{ base: 2, md: 3 }}
                _hover={{ opacity: 0.8 }}
                transition="opacity 0.2s"
              >
                <Box
                  w={{ base: 8, md: 10 }}
                  h={{ base: 8, md: 10 }}
                  borderRadius="md"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <img
                    src="/tinkani.svg"
                    alt="KOU Logo"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
                <Heading
                  as="h1"
                  size={{ base: "md", md: "lg" }}
                  color={brandColor}
                  fontWeight="700"
                  letterSpacing="tight"
                >
                  <Text display={{ base: "none", sm: "block" }}>
                    KOU Portfolio
                  </Text>
                  <Text display={{ base: "block", sm: "none" }}>KOU</Text>
                </Heading>
              </HStack>
            </Link>
          </Flex>

          {/* デスクトップナビゲーション */}
          <HStack spacing={1} display={{ base: "none", md: "flex" }}>
            {navigationItems.map((item) => (
              <Button
                key={item.path}
                as={Link}
                to={item.path}
                variant="ghost"
                size="sm"
                leftIcon={<Icon as={item.icon} />}
                color={isActiveRoute(item.path) ? brandColor : textColor}
                bg={isActiveRoute(item.path) ? hoverBg : "transparent"}
                fontWeight={isActiveRoute(item.path) ? "600" : "500"}
                _hover={{
                  bg: hoverBg,
                  color: brandColor,
                  transform: "translateY(-1px)",
                }}
                _active={{
                  transform: "translateY(0)",
                }}
                transition="all 0.2s ease-in-out"
                borderRadius="md"
                px={3}
                fontSize="sm"
              >
                {item.name}
              </Button>
            ))}
          </HStack>

          {/* モバイルメニューボタン */}
          <Button
            onClick={() => setIsOpen(!isOpen)}
            display={{ base: "flex", md: "none" }}
            variant="solid"
            size="md"
            colorScheme="blue"
            bg={brandColor}
            color="white"
            _hover={{ 
              bg: useColorModeValue("blue.700", "blue.300"),
              transform: "translateY(-2px)",
              boxShadow: "lg"
            }}
            _active={{
              transform: "scale(0.95)",
              boxShadow: "md"
            }}
            aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
            leftIcon={<Icon as={isOpen ? FaTimes : FaBars} boxSize={4} />}
            transition="all 0.2s ease-in-out"
            borderRadius="lg"
            fontWeight="bold"
            px={5}
            py={2}
            minW="110px"
            height="44px"
            letterSpacing="wide"
            fontSize="sm"
            boxShadow="md"
            border="2px solid"
            borderColor={useColorModeValue("blue.600", "blue.400")}
            zIndex={99999}
            position="relative"
          >
            {isOpen ? "閉じる" : "メニュー"}
          </Button>
        </Flex>

        {/* モバイルナビゲーション */}
        <Box
          pb={isOpen ? 6 : 0}
          display={{ md: "none" }}
          borderTop={isOpen ? "1px solid" : "none"}
          borderColor={borderColor}
          pt={isOpen ? 6 : 0}
          overflow="hidden"
          maxHeight={isOpen ? "500px" : "0"}
          transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
          opacity={isOpen ? 1 : 0}
          bg={bgColor}
          boxShadow={isOpen ? "inner" : "none"}
        >
          <VStack spacing={3} align="stretch" px={2}>
            {navigationItems.map((item) => (
              <Button
                key={item.path}
                as={Link}
                to={item.path}
                variant="ghost"
                justifyContent="flex-start"
                leftIcon={<Icon as={item.icon} boxSize={5} />}
                color={isActiveRoute(item.path) ? brandColor : textColor}
                bg={isActiveRoute(item.path) ? hoverBg : "transparent"}
                fontWeight={isActiveRoute(item.path) ? "600" : "500"}
                _hover={{ 
                  bg: hoverBg, 
                  color: brandColor,
                  transform: "translateX(4px)",
                  borderLeft: "3px solid",
                  borderColor: brandColor
                }}
                onClick={onToggle}
                w="full"
                h={14}
                borderRadius="lg"
                fontSize="md"
                px={4}
                transition="all 0.2s ease-in-out"
                borderLeft={isActiveRoute(item.path) ? "3px solid" : "3px solid transparent"}
                borderColor={isActiveRoute(item.path) ? brandColor : "transparent"}
              >
                {item.name}
              </Button>
            ))}
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
