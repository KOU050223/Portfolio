import React, { useState, useMemo } from 'react'
import { 
  Box, 
  Flex, 
  Heading, 
  Spacer, 
  Button, 
  HStack, 
  VStack,
  Circle,
  Text,
  Badge,
  Wrap,
  WrapItem
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useColorModeValue } from "../components/ui/color-mode";
import { useCareer } from '../hooks/useCareer'

const Career = () => {
  const { career, isLoading, error } = useCareer()
  const [sortOrder, setSortOrder] = useState('newest') // newest, oldest
  const [selectedTag, setSelectedTag] = useState('all') // all, or specific tag
  
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const lineColor = useColorModeValue('gray.300', 'gray.500')
  
  // 全てのタグを取得
  const allTags = useMemo(() => {
    if (!career.length) return []
    const tags = new Set()
    career.forEach(item => {
      if (item.type) {
        item.type.split(',').forEach(tag => {
          tags.add(tag.trim())
        })
      }
    })
    return Array.from(tags).sort()
  }, [career])


  // フィルタリングとソート処理
  const filteredAndSortedCareer = useMemo(() => {
    let filtered = [...career]
    
    // タグフィルタリング
    if (selectedTag !== 'all') {
      filtered = filtered.filter(item => 
        item.type && item.type.split(',').some(tag => tag.trim() === selectedTag)
      )
    }
    
    // ソート処理
    filtered.sort((a, b) => {
      const dateA = new Date(a.date.replace(/(\d+)\/(\d+)\/(\d+)/, '$1-$2-$3'))
      const dateB = new Date(b.date.replace(/(\d+)\/(\d+)\/(\d+)/, '$1-$2-$3'))
      
      if (sortOrder === 'newest') {
        return dateB - dateA
      } else {
        return dateA - dateB
      }
    })
    
    return filtered
  }, [career, selectedTag, sortOrder])
  
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

  return (
    <Box maxW="1200px" mx="auto" p={8}>
      <Heading size="lg" mb={8}>キャリア</Heading>
      
      {/* クイックフィルター */}
      <Box mb={8} p={4} bg={bgColor} borderRadius="lg" border="1px" borderColor={borderColor} boxShadow="sm">
        <VStack spacing={4} align="stretch">
          <Box>
            <Text fontSize="sm" mb={3} fontWeight="medium">タグでフィルタリング</Text>
            <Wrap spacing={2}>
              <WrapItem>
                <Badge
                  variant={selectedTag === 'all' ? 'solid' : 'outline'}
                  colorScheme={selectedTag === 'all' ? 'blue' : 'gray'}
                  cursor="pointer"
                  onClick={() => setSelectedTag('all')}
                  px={3}
                  py={1}
                  borderRadius="full"
                  fontSize="sm"
                >
                  すべて ({career.length})
                </Badge>
              </WrapItem>
              {allTags.map(tag => {
                const count = career.filter(item => 
                  item.type && item.type.split(',').some(t => t.trim() === tag)
                ).length
                return (
                  <WrapItem key={tag}>
                    <Badge
                      variant={selectedTag === tag ? 'solid' : 'outline'}
                      colorScheme={selectedTag === tag ? (tag === '受賞' ? 'yellow' : 'blue') : 'gray'}
                      cursor="pointer"
                      onClick={() => setSelectedTag(tag)}
                      px={3}
                      py={1}
                      borderRadius="full"
                      fontSize="sm"
                    >
                      {tag} ({count})
                    </Badge>
                  </WrapItem>
                )
              })}
            </Wrap>
          </Box>
          
          {/* 結果表示 */}
          <Box>
            <Text fontSize="sm" color="gray.500">
              {filteredAndSortedCareer.length}件の経歴を表示中
              {selectedTag !== 'all' && ` (「${selectedTag}」でフィルタリング)`}
            </Text>
          </Box>
        </VStack>
      </Box>
      
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
        
        {filteredAndSortedCareer.map((item, index) => {
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