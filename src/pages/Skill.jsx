import React from 'react'
import { 
  Box, 
  Flex, 
  Heading, 
  HStack, 
  VStack,
  Circle,
  Text,
  Image,
  Square
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
        { name: "React", level: "中級", icons: "react" },
        { name: "Tailwind CSS", level: "中級", icons: "tailwind" },
        { name: "TypeScript", level: "中級", icons: "ts" },
        { name: "JavaScript", level: "中級", icons: "js" },
        { name: "Next.js", level: "初級", icons: "nextjs" },
        { name: "Redux", level: "初級", icons: "redux" },
      ]
    },
    {
      name: "バックエンド",
      skills: [
        { name: "Node.js", level: "中級", icons: "nodejs" },
        { name: "Laravel", level: "中級", icons: "laravel" },
        { name: "Express", level: "中級", icons: "express" },
        { name: "Flask", level: "中級", icons: "flask" },
        { name: "FastAPI", level: "初級", icons: "fastapi" },
        { name: "Firebase Functions", level: "初級", icons: "firebase" },
        { name: "lambda", level: "初級", icons: "aws" },
        { name: "PHP", level: "中級", icons: "php" },
        { name: "Java", level: "初級", icons: "java" },
        { name: "Go", level: "初級", icons: "go" },
      ]
    },
    {
      name: "モバイル",
      skills: [
        { name: "Flutter", level: "中級", icons: "flutter" },
        { name: "Unity", level: "中級", icons: "unity" },
      ]
    },
    {
      name: "言語",
      skills: [
        { name: "Swift", level: "初級", icons: "swift" },
        { name: "C", level: "初級", icons: "c" },
        { name: "C#", level: "初級", icons: "cs" },
        { name: "JavaScript", level: "中級", icons: "js" },
        { name: "TypeScript", level: "中級", icons: "ts" },
        { name: "PHP", level: "中級", icons: "php" },
        { name: "Dart", level: "中級", icons: "dart" },
        { name: "Python", level: "中級", icons: "python" },
        { name: "Java", level: "初級", icons: "java" },
        { name: "Go", level: "初級", icons: "go" },
        { name: "Ruby", level: "初級", icons: "ruby" },
      ]
    },
    {
      name: "データベース",
      skills: [
        { name: "MySQL", level: "中級", icons: "mysql" },
        { name: "PostgreSQL", level: "初級", icons: "postgres" },
        { name: "Dynamodb", level: "初級", icons: "dynamodb" },
        { name: "Sqlite", level: "初級", icons: "sqlite" },
        { name: "Firestore", level: "中級", icons: "firebase" },
      ]
    },
    {
      name: "DevOps & クラウド",
      skills: [
        { name: "GitHub", level: "中級", icons: "github" },
        { name: "Git", level: "中級", icons: "git" },
        { name: "Docker", level: "初級", icons: "docker" },
        { name: "AWS", level: "中級", icons: "aws" },
        { name: "Firebase", level: "中級", icons: "firebase" },
        { name: "Vercel", level: "初級", icons: "vercel" },
        { name: "Azure", level: "初級", icons: "azure" },
        { name: "Cloudflare", level: "中級", icons: "cloudflare" },
        { name: "GitHub Actions", level: "初級", icons: "githubactions" },
      ]
    },
    {
      name: "ツール",
      skills: [
        { name: "Postman", level: "初級", icons: "postman" },
        { name: "Notion", level: "初級", icons: "notion" },
        { name: "VSCode", level: "中級", icons: "vscode" },
        { name: "VisualStudio", level: "初級", icons: "visualstudio" },
        { name: "Discord", level: "中級", icons: "discord" },
        { name: "Figma", level: "中級", icons: "figma" },
      ]
    }
  ];

        // { name: "", level: "初級", icons: "" },

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
                  level === "上級" ? "実務経験あり、高度な実装可能、何か作ったことがある" :
                  level === "中級" ? "実務経験なし、基本的な実装可能、何か作ったことがある" :
                  "基礎知識あり、学習中"
                }</Text>
              </Flex>
            ))}
          </HStack>
        </Box>
        
        {/* モバイル対応の技術一覧 */}
        <Box mt={10} display={{ base: 'block', md: 'none' }}>
          <Heading size="sm" mb={6}>全ての技術</Heading>
          <Box>
            <Flex flexWrap="wrap" justifyContent="center" gap={4}>
              {(() => {
                // 重複を除去した技術リストを作成
                const seen = new Set();
                return skillCategories.flatMap(category => category.skills)
                  .filter(skill => {
                    if (seen.has(skill.name)) return false;
                    seen.add(skill.name);
                    return true;
                  });
              })().map((skill, index) => (
                <VStack key={index} >
                  <Image s
                    src={`https://skillicons.dev/icons?i=${skill.icons}`} 
                    alt={skill.name}
                    h="36px"
                  />
                </VStack>
              ))}
            </Flex>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Skill