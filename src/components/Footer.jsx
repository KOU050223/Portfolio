import {
  Container,
  Link,
  Text,
  Flex,
  Box,
  VStack,
  HStack,
  Heading,
  Icon,
  Button,
  SimpleGrid,
  Image,
} from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";
import {
  FaTwitter,
  FaGithub,
  FaEnvelope,
  FaMapMarkerAlt
} from "react-icons/fa";
import { SiQiita } from "react-icons/si";
import React from "react";

const Footer = () => {
  const bgColor = useColorModeValue("gray.700", "gray.900");
  const textColor = "white";
  const borderColor = useColorModeValue("whiteAlpha.300", "whiteAlpha.200");
  const boxBgColor = useColorModeValue("whiteAlpha.100", "whiteAlpha.50");
  const accentColor = "blue.300";
  const copyrightColor = useColorModeValue("gray.400", "gray.500");

  return (
      <Box as="footer" bg={bgColor} color={textColor} py={10}>
          <Container maxW="container.xl">
              <Flex
                  direction={{ base: "column", md: "row" }}
                  justify="space-between"
                  gap={10}
              >
                  {/* 情報セクション */}
                  <Box flex={1.5} ml={5}>
                      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                          {/* 情報 */}
                          <VStack align="flex-start" spacing={4}>
                              <Heading as="h3" size="md" fontWeight="bold" mb={2}>
                                  ウオミー（魚見コウ）
                              </Heading>

                              <HStack spacing={2} align="flex-start">
                                  <Icon as={FaMapMarkerAlt} color={accentColor} mt={1} />
                                  <Text fontSize="sm">
                                      福岡県
                                  </Text>
                              </HStack>

                              <HStack spacing={2}>
                                  <Icon as={FaEnvelope} color={accentColor} />
                                  <Text fontSize="sm">s23a1090@bene.fit.ac.jp</Text>
                              </HStack>
                          </VStack>
                      </SimpleGrid>

                      {/* SNSリンク */}
                      <Heading as="h3" size="md" fontWeight="bold" mt={8} mb={4}>
                          SNS等リンク
                      </Heading>

                      <HStack spacing={6} pt={2}>
                          <Link href="https://x.com/uomikou_0223" isExternal>
                              <HStack
                                  spacing={1}
                                  color={textColor}
                                  _hover={{
                                      color: accentColor,
                                      transform: "translateY(-2px)",
                                      transition: "all 0.2s ease",
                                  }}
                                  transition="all 0.2s ease"
                              >
                                  <Icon as={FaTwitter} boxSize={6} />
                                  <Text fontSize="sm">Twitter</Text>
                              </HStack>
                          </Link>
                          <Link href="https://github.com/KOU050223" isExternal>
                              <HStack
                                  spacing={1}
                                  color={textColor}
                                  _hover={{
                                      color: accentColor,
                                      transform: "translateY(-2px)",
                                      transition: "all 0.2s ease",
                                  }}
                                  transition="all 0.2s ease"
                              >
                                  <Icon as={FaGithub} boxSize={6} />
                                  <Text fontSize="sm">GitHub</Text>
                              </HStack>
                          </Link>
                          <Link href="aaaa" isExternal>
                                <HStack
                                    spacing={1}
                                    color={textColor}
                                    _hover={{
                                        color: accentColor,
                                        transform: "translateY(-2px)",
                                        transition: "all 0.2s ease",
                                    }}
                                    transition="all 0.2s ease"
                                >
                                <Box boxSize={6}>
                                  <Image
                                    src="https://qiita-tag-images.imgix.net/https%3A%2F%2Fs3-ap-northeast-1.amazonaws.com%2Fqiita-tag-image%2F4cd8104d36975fb7c3f420821a520ef8b311a88c%2Foriginal.jpg%3F1606303176?ixlib=rb-4.0.0&auto=compress%2Cformat&lossless=0&w=128&h=128&s=0576ec8b0134a113c2f208df055d1e68"
                                    alt="Qiita"
                                    borderRadius="full"
                                  />
                                </Box>     
                                <Text fontSize="sm">Qiita</Text>
                               </HStack>
                            </Link>
                      </HStack>
                  </Box>
              </Flex>

              <Box pt={8} mt={6} borderTopWidth="1px" borderColor={borderColor}>
                  <Text fontSize="sm" color={copyrightColor} textAlign="center">
                      ©2024-2025 Uomi KOU . All rights reserved.
                  </Text>
              </Box>
          </Container>
      </Box>
  );
};

export default Footer;
