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

const Hobby = () => {
  
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const lineColor = useColorModeValue('gray.300', 'gray.500')

  return (
    <Box maxW="1200px" mx="auto" p={8}>
      <Heading size="lg" mb={8}>趣味</Heading>
      
    </Box>
  )
}

export default Hobby