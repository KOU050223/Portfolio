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
import { skillCategories, getLevelColor } from '../data/skills';

const Skill = () => {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const textColor = useColorModeValue('gray.700', 'gray.300')


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