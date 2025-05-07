import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Heading, Spacer, Button, HStack } from '@chakra-ui/react';
import HamburgerMenu from './HamburgerMenu.jsx';

const Header = () => {
  return (
    <Box 
      as="header" 
      bg="gray.100" 
      px={4} 
      py={3} 
      boxShadow="0 2px 4px rgba(0, 0, 0, 0.05)"
      borderBottom="1px solid"
      borderColor="gray.200"
    >
      <Flex alignItems="center" maxW="auto" mx="auto">
        <Heading as="h1" size="md" color="gray.700" fontWeight="600">
          <Link to="/" _hover={{ textDecoration: 'none', color: 'blue.500' }}>
            KOUサイト
          </Link>
        </Heading>
        
        <Spacer />
        
        <HStack spacing={4}>
          <Button 
            as={Link} 
            to="/production" 
            variant="ghost" 
            color="gray.600"
            _hover={{ bg: 'gray.200', color: 'blue.500' }}
            fontWeight="medium"
            transition="all 0.2s ease-in-out"
          >
            作品一覧
          </Button>
        </HStack>
        <Box
          display={{ base: 'block', md: 'none' }} 
          ml={2}
        />
        <HStack spacing={4}>
          <Button 
            as={Link} 
            to="/career" 
            variant="ghost" 
            color="gray.600"
            _hover={{ bg: 'gray.200', color: 'blue.500' }}
            fontWeight="medium"
            transition="all 0.2s ease-in-out"
          >
            キャリア
          </Button>
        </HStack>
        <Box
          display={{ base: 'block', md: 'none' }} 
          ml={2}
        />
        <HStack spacing={4}>
          <Button 
            as={Link} 
            to="/skill" 
            variant="ghost" 
            color="gray.600"
            _hover={{ bg: 'gray.200', color: 'blue.500' }}
            fontWeight="medium"
            transition="all 0.2s ease-in-out"
          >
            技術スタック
          </Button>
        </HStack>
        <Box
          display={{ base: 'block', md: 'none' }} 
          ml={2}
        />
        <HStack spacing={4}>
          <Button 
            as={Link} 
            to="/hobby" 
            variant="ghost" 
            color="gray.600"
            _hover={{ bg: 'gray.200', color: 'blue.500' }}
            fontWeight="medium"
            transition="all 0.2s ease-in-out"
          >
            趣味
          </Button>
        </HStack>

      </Flex>
    </Box>
  );
};

export default Header;