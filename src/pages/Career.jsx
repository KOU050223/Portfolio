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
        
        {sortedCareer.map((item, index) => (
          <Flex key={index} mb={10} position="relative">
            {/* タイムラインドット */}
            <Circle 
              size="40px" 
              bg={bgColor} 
              border="4px" 
              borderColor={lineColor}
              position="absolute"
              left="0"
              top="0"
              zIndex={1}
            />
            
            {/* コンテンツカード */}
            <Box ml="70px" width="100%">
              <Box 
                bg={bgColor}
                borderRadius="lg"
                border="1px"
                borderColor={borderColor}
                p={6}
                boxShadow="sm"
              >
                <Flex justify="space-between" align="center" mb={2}>
                  <Heading size="md" color="blue.600">
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
                  <Box
                    display="inline-block"
                    px={3}
                    py={1}
                    borderRadius="full"
                    bg="blue.100"
                    color="blue.800"
                    fontSize="sm"
                  >
                    {item.type}
                  </Box>
                )}
              </Box>
            </Box>
          </Flex>
        ))}
      </Box>
    </Box>
  )
}

export default Career