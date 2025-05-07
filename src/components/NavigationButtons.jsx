import React from 'react';
import { Flex, Button, Text, Box, Icon } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaCode, FaBriefcase, FaGamepad, FaTools } from 'react-icons/fa';

const NavigationButtons = ({ onClick }) => {
  const navigate = useNavigate();
  
  // ナビゲーション項目
  const navItems = [
    { name: '作品一覧', icon: FaCode, path: '/production', color: 'teal.500' },
    { name: 'キャリア', icon: FaBriefcase, path: '/career', color: 'blue.500' },
    { name: '技術スタック', icon: FaTools, path: '/skill', color: 'orange.500' },
    { name: '趣味', icon: FaGamepad, path: '/hobby', color: 'purple.500' },
  ];

  // クリックハンドラ - 遷移とドロワーを閉じる両方を処理
  const handleClick = (path) => {
    navigate(path);
    // onClickが提供されている場合のみ実行（ドロワーを閉じる）
    if (onClick) onClick();
  };

  return (
    <Flex 
      direction={{ base: 'column', md: 'row' }}
      justify="center"
      align="center"
      wrap="wrap"
      gap={6}
      mt={10}
      mb={8}
      w="full"
    >
      {navItems.map((item) => (
        <Box
          key={item.path}
          as="button"
          p={6}
          w={{ base: '220px', md: '220px' }}
          h={{ base: '180px', md: '180px' }}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          borderRadius="lg"
          bg="white"
          boxShadow="md"
          position="relative"
          overflow="hidden"
          transition="all 0.3s ease"
          _hover={{ 
            transform: "translateY(-8px)",
            boxShadow: "lg"
          }}
          onClick={() => handleClick(item.path)}
        >
          {/* 下部のボーダーアニメーション */}
          <Box
            position="absolute"
            bottom="0"
            left="0"
            h="4px"
            w="0"
            bg={item.color}
            transition="width 0.3s ease"
            _groupHover={{ width: "100%" }}
          />
          
          <Icon 
            as={item.icon} 
            boxSize={10} 
            color={item.color} 
            mb={4} 
            transition="transform 0.2s ease"
            _groupHover={{ transform: "translateY(-5px)" }}
          />
          
          <Text 
            fontSize="xl" 
            fontWeight="bold"
            color={item.color}
            transition="all 0.2s ease 0.1s"
            _groupHover={{ transform: "translateY(-3px)" }}
          >
            {item.name}
          </Text>
        </Box>
      ))}
    </Flex>
  );
};

export default NavigationButtons;