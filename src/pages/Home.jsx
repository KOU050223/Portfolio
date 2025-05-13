import React from 'react'
import { Box, Flex, Heading, Text, VStack, HStack, Image, Container, Link, Icon } from '@chakra-ui/react'
import { FaGithub, FaTwitter, FaEnvelope } from 'react-icons/fa'
import NavigationButtons from '../components/NavigationButtons'
import Seo from '../components/Seo'


const Home = () => {
  return (
    <>
      <Seo
        title="魚住 紘平 | ウオミコウのポートフォリオサイト"
        description="魚住 紘平 | ウオミコウのポートフォリオサイト"
        image="/tinkani.svg"
      />

      <Container maxW="container.lg" py={10} mx="auto">
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
            <Heading as="h1" size="xl">魚住 紘平</Heading>
            <Text fontSize="xl" fontWeight="bold" color="teal.500">ソフトウェアエンジニア</Text>
            
            <Text fontSize="md">
              はじめまして！福岡工業大学の情報工学科に在籍している魚住 紘平です。<br/>
              現在は大学3年生です。<br/>
              2年生の頃から本格的にプログラミングで制作活動を始め、
              さまざまなプロジェクトに取り組んできました。<br/>
              新しい技術を学ぶことが好きで、常に自己成長を目指しています。
              様々な技術が触れるためフルスタックに開発することが多いですが、
              特にバックエンドの開発を行うことが多いです。<br/>
            </Text>
            
            <HStack spacing={4} pt={2} justify="center">
              <Link href="https://github.com/KOU050223" isExternal>
                <Icon as={FaGithub} w={6} h={6} />
              </Link>
              <Link href="https://x.com/uomikou_0223" isExternal>
                <Icon as={FaTwitter} w={6} h={6} />
              </Link>
              <Link href="mailto:s23a1090@bene.fit.ac.jp" isExternal>
                <Icon as={FaEnvelope} w={6} h={6} />
              </Link>
            </HStack>
          </VStack>
        </Flex>  
        {/* Navigation Buttons */}
        <NavigationButtons />
        
      </Container>
    </>
  )
}

export default Home