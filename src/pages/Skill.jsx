import React from 'react'
import { 
  Box, 
  Flex, 
  Heading, 
  HStack, 
  VStack,
  Circle,
  Text,
  Image
} from '@chakra-ui/react'
import { useColorModeValue } from "../components/ui/color-mode";

const Skill = () => {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const textColor = useColorModeValue('gray.700', 'gray.300')

  // スキルデータの定義
  const skillCategories = [
    {
      name: "フロントエンド",
      skills: [
        { name: "React", level: "上級", icons: "react" },
        { name: "TypeScript", level: "上級", icons: "ts" },
        { name: "JavaScript", level: "上級", icons: "js" },
        { name: "HTML/CSS", level: "上級", icons: "html,css" },
        { name: "Vue", level: "中級", icons: "vue" },
        { name: "Next.js", level: "中級", icons: "nextjs" },
      ]
    },
    {
      name: "バックエンド",
      skills: [
        { name: "Node.js", level: "中級", icons: "nodejs" },
        { name: "Express", level: "中級", icons: "express" },
        { name: "PHP", level: "中級", icons: "php" },
        { name: "Python", level: "初級", icons: "python" },
        { name: "Java", level: "初級", icons: "java" },
      ]
    },
    {
      name: "データベース",
      skills: [
        { name: "MySQL", level: "中級", icons: "mysql" },
        { name: "MongoDB", level: "初級", icons: "mongodb" },
        { name: "PostgreSQL", level: "初級", icons: "postgres" },
      ]
    },
    {
      name: "DevOps & ツール",
      skills: [
        { name: "Git", level: "上級", icons: "git" },
        { name: "GitHub", level: "上級", icons: "github" },
        { name: "Docker", level: "中級", icons: "docker" },
        { name: "AWS", level: "中級", icons: "aws" },
        { name: "Firebase", level: "中級", icons: "firebase" },
        { name: "Kubernetes", level: "初級", icons: "kubernetes" },
      ]
    },
  ];

  // スキルレベルの色分け
  const getLevelColor = (level) => {
    switch(level) {
      case "上級": return "green.500";
      case "中級": return "blue.500";
      case "初級": return "orange.500";
      default: return "gray.500";
    }
  };

  return (
    <Box maxW="1200px" mx="auto" p={8}>
      <Heading size="lg" mb={8}>技術スタック</Heading>
      
      <Box position="relative">
        <VStack spacing={10} align="stretch">
          {skillCategories.map((category, categoryIndex) => (
            <Box key={categoryIndex} bg={bgColor} borderRadius="lg" borderWidth="1px" borderColor={borderColor} overflow="hidden" p={6}>
              <Heading size="md" mb={6} color={textColor}>{category.name}</Heading>
              
              <VStack spacing={6} align="stretch">
                {/* レベル別のスキル表示 */}
                {["上級", "中級", "初級"].map((level) => {
                  const levelSkills = category.skills.filter(skill => skill.level === level);
                  if (levelSkills.length === 0) return null;
                  
                  return (
                    <Box key={level} mb={level !== "初級" ? 8 : 0}>
                      <Flex align="center" mb={4}>
                        <Circle size="16px" bg={getLevelColor(level)} mr={2}></Circle>
                        <Text fontWeight="bold" fontSize="sm">{level}</Text>
                      </Flex>
                      
                      <Box display="flex" flexWrap="wrap" ml={2} gap={6}>
                        {levelSkills.map((skill, skillIndex) => (
                          <VStack key={skillIndex} spacing={2} align="center" minW="120px" flex="0 0 auto">
                            <Image 
                              src={`https://skillicons.dev/icons?i=${skill.icons}`} 
                              alt={skill.name}
                              h="50px"
                            />
                            <Text fontSize="sm" fontWeight="medium">{skill.name}</Text>
                          </VStack>
                        ))}
                      </Box>
                    </Box>
                  );
                })}
              </VStack>
            </Box>
          ))}
        </VStack>
        
        {/* 凡例 */}
        <Box mt={8} p={4} bg={bgColor} borderRadius="md" borderWidth="1px" borderColor={borderColor}>
          <Heading size="sm" mb={4}>スキルレベル凡例</Heading>
          <HStack spacing={6} wrap="wrap" alignItems="flex-start">
            {["上級", "中級", "初級"].map((level) => (
              <Flex key={level} align="center" mb={{ base: 2, md: 0 }}>
                <Circle size="12px" bg={getLevelColor(level)} mr={2}></Circle>
                <Text fontSize="sm">{level}: {
                  level === "上級" ? "実務経験あり、高度な実装可能" :
                  level === "中級" ? "実務経験なし、基本的な実装可能" :
                  "基礎知識あり、学習中"
                }</Text>
              </Flex>
            ))}
          </HStack>
        </Box>
        
        {/* モバイル対応の技術一覧 */}
        <Box mt={10} display={{ base: 'block', md: 'none' }}>
          <Heading size="sm" mb={6}>全ての技術</Heading>
          <Box textAlign="center">
            <Image 
              src={`https://skillicons.dev/icons?i=react,ts,js,html,css,vue,nextjs,nodejs,express,php,python,java,mysql,mongodb,postgres,git,github,docker,aws,firebase,kubernetes&perline=7`} 
              alt="All skills"
              maxW="100%"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Skill