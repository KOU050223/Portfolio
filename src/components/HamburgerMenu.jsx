import React, { useState, useEffect } from 'react';
import {
  Box,
  IconButton,
  useDisclosure,
  VStack,
  Heading,
  CloseButton
} from '@chakra-ui/react';
import NavigationButtons from './NavigationButtons';

const HamburgerMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile, setIsMobile] = useState(false);

  // useMediaQueryの代わりにwindow.matchMediaを使用
  useEffect(() => {
    const checkIfMobile = () => {
      const match = window.matchMedia("(max-width: 768px)");
      setIsMobile(match.matches);
    };
    
    // 初期チェック
    checkIfMobile();
    
    // リサイズ時のリスナー
    window.addEventListener('resize', checkIfMobile);
    
    // クリーンアップ
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  
  // PCサイズでは直接NavigationButtonsを表示
  if (!isMobile) {
    return <NavigationButtons />;
  }
  
  return (
    <Box>
      {/* ハンバーガーボタン - アイコンを直接埋め込み */}
      <IconButton
        aria-label="メニューを開く"
        icon={
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        }
        size="lg"
        colorScheme="teal"
        position="fixed"
        top="20px"
        right="20px"
        zIndex={10}
        onClick={onOpen}
      />
      
      {/* 独自実装のドロワーメニュー */}
      {isOpen && (
        <>
          {/* オーバーレイ */}
          <Box
            position="fixed"
            top="0"
            left="0"
            right="0"
            bottom="0"
            bg="blackAlpha.600"
            zIndex={1000}
            onClick={onClose}
          />
          
          {/* ドロワーコンテンツ */}
          <Box
            position="fixed"
            top="0"
            right="0"
            width="full"
            height="100vh"
            bg="white"
            zIndex={1001}
            boxShadow="lg"
            overflowY="auto"
          >
            {/* ヘッダー */}
            <Box 
              p={4} 
              borderBottomWidth="1px"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Heading size="md">メニュー</Heading>
              <CloseButton onClick={onClose} />
            </Box>
            
            {/* ボディ */}
            <Box p={4}>
              <VStack spacing={8} align="stretch" pt={6}>
                {/* NavigationButtonsコンポーネントを表示 */}
                <NavigationButtons onClick={onClose} />
              </VStack>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default HamburgerMenu;