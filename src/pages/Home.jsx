import React from 'react'
import { 
  Box, 
  Flex, 
  Heading, 
  Text, 
  VStack, 
  HStack, 
  Image, 
  Container, 
  Link, 
  Icon,
  Button,
  SimpleGrid,
  Badge,
  Stack,
  Avatar,
  AvatarGroup
} from '@chakra-ui/react'
import { 
  FaGithub, 
  FaTwitter, 
  FaEnvelope, 
  FaCode, 
  FaBriefcase, 
  FaGraduationCap,
  FaArrowRight,
  FaStar,
  FaEye,
  FaRocket,
  FaCog
} from 'react-icons/fa'
import { Link as RouterLink } from 'react-router-dom'
import NavigationButtons from '../components/NavigationButtons'
import Seo from '../components/Seo'
import { useProjects } from '../hooks/useProjects'
import { useCareer } from '../hooks/useCareer'
import { useColorModeValue } from '../components/ui/color-mode'
import { skillCategories, getSkillColor } from '../data/skills'


const Home = () => {
  const { projects, isLoading: projectsLoading } = useProjects()
  const { career, isLoading: careerLoading } = useCareer()
  
  const bgColor = useColorModeValue('white', 'gray.800')
  const cardBg = useColorModeValue('gray.50', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const textColor = useColorModeValue('gray.600', 'gray.300')
  const headingColor = useColorModeValue('gray.800', 'white')
  const brandColor = useColorModeValue('blue.600', 'blue.400')
  
  // 最新の3つのプロジェクトを取得
  const latestProjects = projects.slice(0, 3)
  // 最新の3つのキャリアを取得
  const latestCareer = career.slice(0, 3)
  
  // メインスキルを中級以上から抽出（重複除去）
  const allSkills = skillCategories.flatMap(category => category.skills);
  const seen = new Set();
  const mainSkills = allSkills
    .filter(skill => {
      if (seen.has(skill.name) || skill.level === "初級") return false;
      seen.add(skill.name);
      return true;
    })
    .slice(0, 6)
    .map(skill => ({
      name: skill.name,
      level: skill.level === "中級" ? 75 : 90,
      color: getSkillColor(skill.name),
      icons: skill.icons
    }));
  
  // 全技術数を計算（重複除去）
  const totalSkillsCount = new Set(allSkills.map(skill => skill.name)).size;

  return (
    <>
      <Seo
        title="魚住 紘平 | ウオミコウのポートフォリオサイト"
        description="魚住 紘平 | ウオミコウのポートフォリオサイト"
        image="/tinkani.svg"
      />

      <Container maxW="container.xl" py={8} mx="auto">
        {/* ヒーローセクション */}
        <Box
          bg={bgColor}
          py={12}
          px={8}
          borderRadius="xl"
          mb={12}
          shadow="lg"
        >
          <Flex 
            direction={{ base: 'column', md: 'row' }} 
            align="center" 
            gap={8}
          >
            <Image
              src="https://pbs.twimg.com/profile_images/1899830477785075712/LxVQunEl_400x400.jpg"
              alt="プロフィール画像"
              borderRadius="full"
              boxSize={{ base: '200px', md: '250px' }}
              objectFit="cover"
              shadow="lg"
            />
            <VStack align={{ base: 'center', md: 'start' }} spacing={4} flex={1}>
              <Heading 
                as="h1" 
                size="2xl" 
                color={headingColor}
                textAlign={{ base: 'center', md: 'left' }}
              >
                魚住 紘平
              </Heading>
              <Text fontSize="xl" fontWeight="bold" color={brandColor}>
                Software Engineer
              </Text>
              <Text fontSize="md" color={textColor} textAlign={{ base: 'center', md: 'left' }} lineHeight="1.6">
                福岡工業大学情報工学科在籍（3年生）<br/>
                フルスタック開発者として、新しい技術への挑戦と学習を通じて価値のあるプロダクトを創造
              </Text>
              <HStack spacing={4} pt={2}>
                <Button
                  as={RouterLink}
                  to="/production"
                  colorScheme="whiteAlpha"
                  backgroundcolor={brandColor}
                  color="white"
                  rightIcon={<FaArrowRight />}
                >
                  作品を見る
                </Button>
                <Button
                  as={Link}
                  href="https://github.com/KOU050223"
                  isExternal
                  variant="outline"
                  leftIcon={<FaGithub />}
                >
                  GitHub
                </Button>
              </HStack>
            </VStack>
          </Flex>
        </Box>

        {/* 統計情報 */}
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6} mb={12}>
          <Box bg={cardBg} p={6} textAlign="center" borderRadius="xl" shadow="md">
            <Icon as={FaCode} boxSize={8} color={brandColor} mx="auto" mb={3} />
            <Heading size="lg" color={headingColor}>{projects.length}+</Heading>
            <Text color={textColor} fontSize="sm">プロジェクト</Text>
          </Box>
          <Box bg={cardBg} p={6} textAlign="center" borderRadius="xl" shadow="md">
            <Icon as={FaBriefcase} boxSize={8} color={brandColor} mx="auto" mb={3} />
            <Heading size="lg" color={headingColor}>{career.length}+</Heading>
            <Text color={textColor} fontSize="sm">経験・実績</Text>
          </Box>
          <Box bg={cardBg} p={6} textAlign="center" borderRadius="xl" shadow="md">
            <Icon as={FaGraduationCap} boxSize={8} color={brandColor} mx="auto" mb={3} />
            <Heading size="lg" color={headingColor}>1.5年</Heading>
            <Text color={textColor} fontSize="sm">学習期間</Text>
          </Box>
          <Box bg={cardBg} p={6} textAlign="center" borderRadius="xl" shadow="md">
            <Icon as={FaStar} boxSize={8} color={brandColor} mx="auto" mb={3} />
            <Heading size="lg" color={headingColor}>{totalSkillsCount}+</Heading>
            <Text color={textColor} fontSize="sm">技術スタック</Text>
          </Box>
        </SimpleGrid>

        {/* 自己紹介セクション */}
        <Box bg={bgColor} p={8} mb={12} borderRadius="xl" shadow="lg">
          <Heading as="h2" size="lg" mb={6} color={headingColor} textAlign="center">
            <Icon as={FaEye} mr={3} color={brandColor} />
            About Me
          </Heading>
          <VStack spacing={6} align="stretch">
            <Text fontSize="lg" lineHeight="1.8" color={textColor} textAlign="center">
              はじめまして！福岡工業大学の情報工学科に在籍している魚住 紘平です。
              現在は大学3年生で、2年生の頃から本格的にプログラミングで制作活動を始めました。
            </Text>
            <Text fontSize="md" lineHeight="1.7" color={textColor}>
              新しい技術を学ぶことが好きで、常に自己成長を目指しています。
              様々な技術に触れるためフルスタックに開発することが多いですが、
              特にバックエンドの開発を行うことが多いです。
              チーム開発の経験も積んでおり、効率的な開発プロセスと品質の高いコードを心がけています。
            </Text>
            
            <Box h="1px" bg={borderColor} w="full" />
            
            <HStack spacing={8} justify="center" flexWrap="wrap">
              <Link href="https://github.com/KOU050223" isExternal>
                <HStack spacing={2} _hover={{ color: brandColor }}>
                  <Icon as={FaGithub} boxSize={5} />
                  <Text fontWeight="medium">GitHub</Text>
                </HStack>
              </Link>
              <Link href="https://x.com/uomikou_0223" isExternal>
                <HStack spacing={2} _hover={{ color: brandColor }}>
                  <Icon as={FaTwitter} boxSize={5} />
                  <Text fontWeight="medium">Twitter</Text>
                </HStack>
              </Link>
              <Link href="mailto:s23a1090@bene.fit.ac.jp" isExternal>
                <HStack spacing={2} _hover={{ color: brandColor }}>
                  <Icon as={FaEnvelope} boxSize={5} />
                  <Text fontWeight="medium">Email</Text>
                </HStack>
              </Link>
            </HStack>
          </VStack>
        </Box>

        {/* スキル概要 */}
        <Box bg={bgColor} p={8} mb={12} borderRadius="xl" shadow="lg">
          <Heading as="h2" size="lg" mb={8} color={headingColor} textAlign="center">
            <Icon as={FaCog} mr={3} color={brandColor} />
            技術スタック
          </Heading>
          <SimpleGrid columns={{ base: 2, md: 3, lg: 6 }} spacing={6}>
            {mainSkills.map((skill, index) => (
              <VStack key={index} spacing={3} align="center">
                <Image 
                  src={`https://skillicons.dev/icons?i=${skill.icons}`} 
                  alt={skill.name}
                  h="60px"
                  w="60px"
                />
                <VStack spacing={1} align="center">
                  <Text fontWeight="bold" color={headingColor} fontSize="sm" textAlign="center">
                    {skill.name}
                  </Text>
                  <Badge colorScheme={skill.color} size="sm">
                    {skill.level === 75 ? "中級" : "上級"}
                  </Badge>
                </VStack>
              </VStack>
            ))}
          </SimpleGrid>
          <Flex justify="center" mt={8}>
            <Button
              as={RouterLink}
              to="/skill"
              variant="outline"
              colorScheme="blue"
              rightIcon={<FaArrowRight />}
            >
              すべてのスキルを見る
            </Button>
          </Flex>
        </Box>

        {/* 最新プロジェクト */}
        <Box bg={bgColor} p={8} mb={12} borderRadius="xl" shadow="lg">
          <Flex justify="space-between" align="center" mb={8}>
            <Heading as="h2" size="lg" color={headingColor}>
              <Icon as={FaRocket} mr={3} color={brandColor} />
              最新プロジェクト
            </Heading>
            <Button
              as={RouterLink}
              to="/production"
              variant="outline"
              size="sm"
              rightIcon={<FaArrowRight />}
            >
              すべて見る
            </Button>
          </Flex>
          {projectsLoading ? (
            <Text textAlign="center" color={textColor}>読み込み中...</Text>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {latestProjects.map((project, index) => (
                <Box key={index} bg={cardBg} p={6} borderRadius="lg" _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }} transition="all 0.2s">
                  <VStack align="start" spacing={3}>
                    <Heading size="md" color={headingColor} noOfLines={1}>
                      {project.title}
                    </Heading>
                    <Text fontSize="sm" color={textColor} noOfLines={2}>
                      {project.description}
                    </Text>
                    <HStack spacing={2} flexWrap="wrap">
                      {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <Badge key={techIndex} size="sm" colorScheme="blue">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge size="sm" variant="outline">+{project.technologies.length - 3}</Badge>
                      )}
                    </HStack>
                    <Text fontSize="xs" color={textColor}>
                      {project.date}
                    </Text>
                  </VStack>
                </Box>
              ))}
            </SimpleGrid>
          )}
        </Box>

        {/* 最新キャリア */}
        <Box bg={bgColor} p={8} mb={12} borderRadius="xl" shadow="lg">
          <Flex justify="space-between" align="center" mb={8}>
            <Heading as="h2" size="lg" color={headingColor}>
              <Icon as={FaBriefcase} mr={3} color={brandColor} />
              最新の経験・実績
            </Heading>
            <Button
              as={RouterLink}
              to="/career"
              variant="outline"
              size="sm"
              rightIcon={<FaArrowRight />}
            >
              すべて見る
            </Button>
          </Flex>
          {careerLoading ? (
            <Text textAlign="center" color={textColor}>読み込み中...</Text>
          ) : (
            <VStack spacing={4} align="stretch">
              {latestCareer.map((item, index) => (
                <Box key={index} bg={cardBg} p={6} borderRadius="lg">
                  <Flex direction={{ base: 'column', md: 'row' }} gap={4}>
                    <Box minW="100px">
                      <Text fontSize="sm" color={brandColor} fontWeight="bold">
                        {item.date}
                      </Text>
                    </Box>
                    <Box flex={1}>
                      <Heading size="sm" color={headingColor} mb={2}>
                        {item.title}
                      </Heading>
                      <Text fontSize="sm" color={textColor} mb={2}>
                        {item.description}
                      </Text>
                      {item.type && (
                        <HStack spacing={1}>
                          {item.type.split(',').map((tag, tagIndex) => (
                            <Badge key={tagIndex} size="sm" colorScheme="green">
                              {tag.trim()}
                            </Badge>
                          ))}
                        </HStack>
                      )}
                    </Box>
                  </Flex>
                </Box>
              ))}
            </VStack>
          )}
        </Box>
        
        {/* Navigation Buttons */}
        <NavigationButtons />
        
      </Container>
    </>
  )
}

export default Home