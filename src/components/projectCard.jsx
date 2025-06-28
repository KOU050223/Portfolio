"use client"

import PropTypes from 'prop-types';
import {
  Box,
  Image,
  Heading,
  Text,
  Stack,
  Badge,
  Link,
  Button,
  CloseButton,
  Dialog,
  Portal,
  HStack,
  Flex,
} from '@chakra-ui/react';
import { FaGithub, FaYoutube, FaExternalLinkAlt, FaNewspaper, FaInfoCircle, FaUser } from 'react-icons/fa';
import { useColorModeValue } from "../components/ui/color-mode";

const ProjectCard = ({
  title,
  authors,
  date,
  technologies,
  youtubeUrl,
  description,
  deployLink,
  githubLink,
  articleLink
}) => {
  const getYoutubeThumbnail = (url) => {
    if (!url) return null;

    const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);

    if (videoId && videoId[1]) {
      return `https://img.youtube.com/vi/${videoId[1]}/hqdefault.jpg`;
    }

    return null;
  };

  const thumbnailUrl = getYoutubeThumbnail(youtubeUrl);
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.500', 'gray.300');
  const headingColor = useColorModeValue('gray.800', 'white');
  const authorIconColor = useColorModeValue('#718096', '#A0AEC0');
  const noThumbnailBg = useColorModeValue('gray.100', 'gray.600');
  const noThumbnailText = useColorModeValue('gray.500', 'gray.300');
  const detailButtonText = 'black';
  
  // 他のボタンのテキスト色
  const buttonTextColor = 'white';
  
  // ダイアログの背景色と文字色
  const dialogBgColor = useColorModeValue('white', 'gray.800');
  const dialogTextColor = useColorModeValue('gray.800', 'white');
  const dialogBodyColor = useColorModeValue('gray.600', 'gray.300');

  const authorsText = Array.isArray(authors) ? authors.join(', ') : authors;

  return (
    <Box
      maxW={{ base: "100%", sm: "320px" }}
      w="100%"
      bg={bgColor}
      boxShadow={'md'}
      rounded={'lg'}
      p={{ base: 4, md: 6 }}
      overflow={'hidden'}
      borderWidth="1px"
      borderColor={borderColor}
      transition="all 0.3s"
      _hover={{
        transform: { base: 'none', md: 'translateY(-5px)' },
        boxShadow: { base: 'md', md: 'lg' },
      }}
      mx="auto"
      my={{ base: 3, md: 4 }}
    >
      {thumbnailUrl ? (
        <Box
          h={'200px'}
          bg={'gray.100'}
          mt={-6}
          mx={-6}
          mb={6}
          pos={'relative'}
        >
          <Image
            src={thumbnailUrl}
            alt={`${title} thumbnail`}
            fit="cover"
            w="full"
            h="full"
          />
        </Box>
      ) : (
        <Box
          h={'200px'}
          bg={noThumbnailBg}
          mt={-6}
          mx={-6}
          mb={6}
          display="flex"
          alignItems="center"
          justifyContent="center"
          color={noThumbnailText}
        >
          {title}
        </Box>
      )}

      <Heading
        fontSize={'xl'}
        fontWeight={500}
        fontFamily={'body'}
        noOfLines={1}
        color={headingColor}
      >
        {title}
      </Heading>

      <Text color={textColor} fontSize={'sm'} mt={2}>
        {date}
      </Text>

      <HStack mt={2} spacing={1} alignItems="center">
        <FaUser size="12px" color={authorIconColor} />
        <Text color={textColor} fontSize={'sm'} noOfLines={1}>
          {authorsText}
        </Text>
      </HStack>

      <Stack direction={'row'} mt={2} flexWrap="wrap" gap={1}>
        {technologies.map((tech, index) => (
          <Badge key={index} colorScheme="blue" fontSize={'xs'}>
            {tech}
          </Badge>
        ))}
      </Stack>

      {description && (
        <Box mt={3}>
          <Dialog.Root size="lg" placement="center" motionPreset="slide-in-bottom">
            <Dialog.Trigger asChild>
              <Button
                size="sm"
                bg={bgColor}
                variant="solid"
                leftIcon={<FaInfoCircle />}
                width="100%"
                color={detailButtonText}
                fontWeight="bold"
                _hover={{
                  bg: 'gray.200',
                }}
              >
                詳細を見る
              </Button>
            </Dialog.Trigger>
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content bg={dialogBgColor} maxW="90vw" w={{ base: "95%", md: "600px" }}>
                  <Dialog.Header borderBottomWidth="1px" borderBottomColor={borderColor} p={4}>
                    <Dialog.Title color={dialogTextColor} fontSize="xl">{title}</Dialog.Title>
                    <Dialog.CloseTrigger asChild>
                      <CloseButton size="md" />
                    </Dialog.CloseTrigger>
                  </Dialog.Header>
                  <Dialog.Body p={4}>
                    <Flex alignItems="center" mb={4}>
                      <FaUser color={authorIconColor} />
                      <Text ml={2} fontWeight="bold" color={dialogTextColor}>作成者: {authorsText}</Text>
                    </Flex>

                    <Text fontSize="sm" color={dialogBodyColor} mb={4}>{date}</Text>

                    <Stack direction={'row'} mb={4} flexWrap="wrap" gap={1}>
                      {technologies.map((tech, index) => (
                        <Badge key={index} colorScheme="blue" fontSize={'sm'}>
                          {tech}
                        </Badge>
                      ))}
                    </Stack>
                    <Text mb={6} color={dialogTextColor} fontSize="md" lineHeight="1.6">{description}</Text>
                    {thumbnailUrl && (
                      <Box maxW="100%" mb={6} borderRadius="md" overflow="hidden" boxShadow="md">
                        <Image
                          src={thumbnailUrl}
                          alt={`${title} thumbnail`}
                          w="full"
                        />
                      </Box>
                    )}
                    <Stack direction={{ base: 'column', md: 'row' }} spacing={4} mt={4}>
                      {youtubeUrl && (
                        <Button
                          as={Link}
                          href={youtubeUrl}
                          isExternal
                          colorScheme="red"
                          leftIcon={<FaYoutube />}
                          color={buttonTextColor}
                          _hover={{
                            textDecoration: 'none'
                          }}
                          w={{ base: 'full', md: 'auto' }}
                        >
                          YouTube
                        </Button>
                      )}
                      {deployLink && (
                        <Button
                          as={Link}
                          href={deployLink}
                          isExternal
                          colorScheme="blue"
                          leftIcon={<FaExternalLinkAlt />}
                          color={buttonTextColor}
                          _hover={{
                            textDecoration: 'none'
                          }}
                          w={{ base: 'full', md: 'auto' }}
                        >
                          作品のリンク
                        </Button>
                      )}
                      {githubLink && (
                        <Button
                          as={Link}
                          href={githubLink}
                          isExternal
                          colorScheme="gray"
                          leftIcon={<FaGithub />}
                          color={buttonTextColor}
                          _hover={{
                            textDecoration: 'none'
                          }}
                          w={{ base: 'full', md: 'auto' }}
                        >
                          GitHub
                        </Button>
                      )}
                      {articleLink && (
                        <Button
                          as={Link}
                          href={articleLink}
                          isExternal
                          colorScheme="green"
                          leftIcon={<FaNewspaper />}
                          color={buttonTextColor}
                          _hover={{
                            textDecoration: 'none'
                          }}
                          w={{ base: 'full', md: 'auto' }}
                        >
                          記事
                        </Button>
                      )}
                    </Stack>
                  </Dialog.Body>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
        </Box>
      )}

      <Stack mt={4} direction={'column'} spacing={2}>
        {youtubeUrl && (
          <Button
            as={Link}
            href={youtubeUrl}
            isExternal
            leftIcon={<FaYoutube />}
            colorScheme="red"
            size="sm"
            color={buttonTextColor}
            _hover={{
              textDecoration: 'none'
            }}
          >
            YouTube
          </Button>
        )}

        {deployLink && (
          <Button
            as={Link}
            href={deployLink}
            isExternal
            leftIcon={<FaExternalLinkAlt />}
            colorScheme="blue"
            size="sm"
            color={buttonTextColor}
            _hover={{
              textDecoration: 'none'
            }}
          >
            作品のリンク
          </Button>
        )}

        {githubLink && (
          <Button
            as={Link}
            href={githubLink}
            isExternal
            leftIcon={<FaGithub />}
            colorScheme="gray"
            size="sm"
            color={buttonTextColor}
            _hover={{
              textDecoration: 'none'
            }}
          >
            GitHub
          </Button>
        )}

        {articleLink && (
          <Button
            as={Link}
            href={articleLink}
            isExternal
            leftIcon={<FaNewspaper />}
            colorScheme="green"
            size="sm"
            color={buttonTextColor}
            _hover={{
              textDecoration: 'none'
            }}
          >
            記事
          </Button>
        )}
      </Stack>
    </Box>
  );
};

ProjectCard.propTypes = {
    title: PropTypes.string.isRequired,
    authors: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]).isRequired,
    date: PropTypes.string,
    technologies: PropTypes.arrayOf(PropTypes.string),
    youtubeUrl: PropTypes.string,
    description: PropTypes.string,
    deployLink: PropTypes.string,
    githubLink: PropTypes.string,
    articleLink: PropTypes.string
};

export default ProjectCard;