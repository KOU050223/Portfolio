import React from 'react'
import { 
  Box, 
  Flex, 
  Heading, 
  Spacer, 
  Button, 
  HStack, 
  VStack,
  Circle,
  Text
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useColorModeValue } from "../components/ui/color-mode";
import { useCareer } from '../hooks/useCareer'

const Career = () => {
  const { career, isLoading, error } = useCareer()
  
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const lineColor = useColorModeValue('gray.300', 'gray.500')
  
  if (isLoading) {
    return (
      <Box p={8}>
        <Heading size="lg" mb={8}>キャリア</Heading>
        <Text>読み込み中...</Text>
      </Box>
    )
  }
  
  if (error) {
    return (
      <Box p={8}>
        <Heading size="lg" mb={8}>キャリア</Heading>
        <Text color="red.500">エラーが発生しました</Text>
      </Box>
    )
  }

  // 日付でソート（新しい順）
  const sortedCareer = [...career].sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <Box maxW="1200px" mx="auto" p={8}>
      <Heading size="lg" mb={8}>キャリア</Heading>
      
      <Box position="relative">
        {/* タイムライン垂直ライン */}
        <Box
          position="absolute"
          left="20px"
          top="0"
          bottom="0"
          width="2px"
          bg={lineColor}
        />
        
        {sortedCareer.map((item, index) => {
          const hasAward = item.type && item.type.includes('受賞');
          
          return (
            <Flex key={index} mb={10} position="relative">
              {/* タイムラインドット */}
              <Circle 
                size="40px" 
                bg={hasAward ? "yellow.300" : bgColor}
                border="4px" 
                borderColor={hasAward ? "yellow.500" : lineColor}
                position="absolute"
                left="0"
                top="0"
                zIndex={1}
                _before={hasAward ? {
                  content: '"🏆"',
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  fontSize: "18px"
                } : {}}
              />
              
              {/* コンテンツカード */}
              <Box ml="70px" width="100%">
                <Box 
                  bg={hasAward ? "yellow.50" : bgColor}
                  borderRadius="lg"
                  border={hasAward ? "2px solid" : "1px"}
                  borderColor={hasAward ? "yellow.400" : borderColor}
                  p={6}
                  boxShadow={hasAward ? "lg" : "sm"}
                  position="relative"
                  _before={hasAward ? {
                    content: '""',
                    position: "absolute",
                    top: "-2px",
                    left: "-2px",
                    right: "-2px",
                    bottom: "-2px",
                    borderRadius: "lg",
                    background: "linear-gradient(45deg, #F6E05E, #ECC94B, #D69E2E)",
                    zIndex: -1,
                    opacity: 0.3
                  } : {}}
                >
                  <Flex justify="space-between" align="center" mb={2}>
                    <Heading 
                      size="md" 
                      color={hasAward ? "yellow.700" : "blue.600"}
                      position="relative"
                    >
                      {hasAward && (
                        <Text as="span" mr={2} fontSize="lg">
                          🏆
                        </Text>
                      )}
                      {item.title}
                    </Heading>
                    <Text 
                      fontSize="sm" 
                      color="gray.500"
                      fontWeight="medium"
                    >
                      {item.date}
                    </Text>
                  </Flex>
                  
                  <Text color="gray.600" mb={2}>
                    {item.description}
                  </Text>
                  
                  {item.type && (
                    <HStack spacing={2} mt={2}>
                      {item.type.split(',').map((tag, tagIndex) => {
                        const trimmedTag = tag.trim();
                        const isAward = trimmedTag === '受賞';
                        return (
                          <Box
                            key={tagIndex}
                            display="inline-block"
                            px={3}
                            py={1}
                            borderRadius="full"
                            bg={isAward ? "yellow.200" : "blue.100"}
                            color={isAward ? "yellow.800" : "blue.800"}
                            fontSize="sm"
                            fontWeight={isAward ? "bold" : "normal"}
                          >
                            {trimmedTag}
                          </Box>
                        );
                      })}
                    </HStack>
                  )}
                </Box>
              </Box>
            </Flex>
          );
        })}
      </Box>
    </Box>
  )
}

export default Career