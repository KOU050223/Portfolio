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
      return `https://img.youtube.com/vi/${videoId[1]}/maxresdefault.jpg`;
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
          No thumbnail available
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
          <Dialog.Root size="md" placement="center" motionPreset="slide-in-bottom">
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
                <Dialog.Content bg={bgColor}>
                  <Dialog.Header>
                    <Dialog.Title color={headingColor}>{title}</Dialog.Title>
                    <Dialog.CloseTrigger asChild>
                      <CloseButton size="sm" />
                    </Dialog.CloseTrigger>
                  </Dialog.Header>
                  <Dialog.Body>
                    <Flex alignItems="center" mb={2}>
                      <FaUser color={authorIconColor} />
                      <Text ml={2} fontWeight="bold" color={headingColor}>作成者: {authorsText}</Text>
                    </Flex>

                    <Text fontSize="sm" color={textColor} mb={4}>{date}</Text>

                    <Stack direction={'row'} mb={4} flexWrap="wrap" gap={1}>
                      {technologies.map((tech, index) => (
                        <Badge key={index} colorScheme="blue" fontSize={'sm'}>
                          {tech}
                        </Badge>
                      ))}
                    </Stack>
                    <Text mb={4} color={headingColor}>{description}</Text>
                    {thumbnailUrl && (
                      <Box maxW="100%" mb={4}>
                        <Image
                          src={thumbnailUrl}
                          alt={`${title} thumbnail`}
                          borderRadius="md"
                          w="full"
                        />
                      </Box>
                    )}
                    <Stack direction={{ base: 'column', md: 'row' }} spacing={4} mt={2}>
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