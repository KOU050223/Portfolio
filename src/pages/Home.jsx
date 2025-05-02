import React from 'react'
import { Box, Flex, Heading, Text, VStack, HStack, Image, Container, Link, Icon } from '@chakra-ui/react'
import { FaGithub, FaTwitter, FaEnvelope } from 'react-icons/fa'

const Home = () => {
  return (
    <Container maxW="container.lg" py={10}>
      <Flex 
        direction={{ base: 'column', md: 'row' }} 
        align="center" 
        gap={8}
        p={6} 
        borderRadius="lg" 
        boxShadow="md"
        bg="white"
      >
        <Image
          src="https://pbs.twimg.com/profile_images/1899830477785075712/LxVQunEl_400x400.jpg"
          alt="プロフィール画像"
          borderRadius="full"
          boxSize={{ base: '200px', md: '250px' }}
          objectFit="cover"
        />
        
        <VStack align="start" spacing={4}>
          <Heading as="h1" size="xl">魚住 康平</Heading>
          <Text fontSize="xl" fontWeight="bold" color="teal.500">ソフトウェアエンジニア</Text>
          
          <Text fontSize="md">
            はじめまして！私はWebアプリケーション開発を専門としているエンジニアです。
            フロントエンドからバックエンドまで幅広い技術に興味を持ち、
            特にReactを使ったUI開発に情熱を注いでいます。
            新しい技術を学ぶことが好きで、常に自己成長を目指しています。
          </Text>
          
          <HStack spacing={4} pt={2}>
            <Link href="https://github.com/" isExternal>
              <Icon as={FaGithub} w={6} h={6} />
            </Link>
            <Link href="https://twitter.com/" isExternal>
              <Icon as={FaTwitter} w={6} h={6} />
            </Link>
            <Link href="mailto:example@example.com">
              <Icon as={FaEnvelope} w={6} h={6} />
            </Link>
          </HStack>
        </VStack>
      </Flex>
    </Container>
  )
}

export default Home
