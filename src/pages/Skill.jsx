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

const Skill = () => {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const lineColor = useColorModeValue('gray.300', 'gray.500')

  return (
    <Box maxW="1200px" mx="auto" p={8}>
      <Heading size="lg" mb={8}>技術スタック</Heading>
      
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
        
      </Box>
    </Box>
  )
}

export default Skill