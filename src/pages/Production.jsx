import "../App.css";
import { 
  Heading, 
  Container, 
  SimpleGrid, 
  Flex, 
  Box, 
  Text, 
  VStack, 
  HStack,
  Badge,
  Wrap,
  WrapItem,
  Icon
} from "@chakra-ui/react";
import { useState, useMemo } from "react";
import { FaCode, FaCalendarAlt, FaUser, FaFilter } from "react-icons/fa";
import { useColorModeValue } from "../components/ui/color-mode";
import { useProjects } from "../hooks/useProjects";
import ProjectCard from "../components/projectCard";

const Production = () => {
  const { projects, isLoading, error } = useProjects();
  const [selectedTech, setSelectedTech] = useState('all');
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  // 全ての技術スタックを取得
  const allTechnologies = useMemo(() => {
    if (!projects.length) return [];
    const techSet = new Set();
    projects.forEach(project => {
      if (project.technologies) {
        project.technologies.forEach(tech => {
          techSet.add(tech);
        });
      }
    });
    return Array.from(techSet).sort();
  }, [projects]);

  // フィルタリング処理
  const filteredProjects = useMemo(() => {
    if (selectedTech === 'all') return projects;
    return projects.filter(project => 
      project.technologies && project.technologies.includes(selectedTech)
    );
  }, [projects, selectedTech]);

  if (isLoading) {
    return (
      <Container maxW="1400px" py={10}>
        <VStack spacing={8}>
          <Box textAlign="center">
            <Heading size="lg" mb={4}>作品一覧</Heading>
            <Text color={textColor}>読み込み中...</Text>
          </Box>
        </VStack>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxW="1400px" py={10}>
        <VStack spacing={8}>
          <Box textAlign="center">
            <Heading size="lg" mb={4}>作品一覧</Heading>
            <Text color="red.500">プロジェクトの読み込みに失敗しました</Text>
          </Box>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="1400px" py={10}>
      <VStack spacing={8}>
        {/* ヘッダーセクション */}
        <Box textAlign="center" maxW="800px">
          <HStack justify="center" mb={4}>
            <Icon as={FaCode} boxSize={8} color="blue.500" />
            <Heading size="2xl" color="blue.600">
              作品一覧
            </Heading>
          </HStack>
          <Text fontSize="lg" color={textColor} mb={6}>
            これまでに開発したプロジェクトの一覧です。各プロジェクトの詳細や技術スタック、デモ・ソースコードをご覧いただけます。
          </Text>
          
          {/* 統計情報 */}
          <HStack justify="center" spacing={8} flexWrap="wrap">
            <VStack spacing={1}>
              <Text fontSize="2xl" fontWeight="bold" color="blue.500">
                {projects.length}
              </Text>
              <Text fontSize="sm" color={textColor}>プロジェクト</Text>
            </VStack>
            <VStack spacing={1}>
              <Text fontSize="2xl" fontWeight="bold" color="green.500">
                {allTechnologies.length}
              </Text>
              <Text fontSize="sm" color={textColor}>技術スタック</Text>
            </VStack>
          </HStack>
        </Box>

        {/* フィルターセクション */}
        <Box 
          w="100%" 
          p={6} 
          bg={bgColor} 
          borderRadius="xl" 
          border="1px" 
          borderColor={borderColor} 
          boxShadow="sm"
        >
          <VStack spacing={4} align="stretch">
            <HStack spacing={2} align="center">
              <Icon as={FaFilter} color="blue.500" />
              <Text fontSize="md" fontWeight="medium">技術スタックでフィルタリング</Text>
            </HStack>
            
            <Wrap spacing={2}>
              <WrapItem>
                <Badge
                  variant={selectedTech === 'all' ? 'solid' : 'outline'}
                  colorScheme={selectedTech === 'all' ? 'blue' : 'gray'}
                  cursor="pointer"
                  onClick={() => setSelectedTech('all')}
                  px={3}
                  py={1}
                  borderRadius="full"
                  fontSize="sm"
                  transition="all 0.2s"
                  _hover={{ transform: "scale(1.05)" }}
                >
                  すべて ({projects.length})
                </Badge>
              </WrapItem>
              {allTechnologies.map(tech => {
                const count = projects.filter(project => 
                  project.technologies && project.technologies.includes(tech)
                ).length;
                return (
                  <WrapItem key={tech}>
                    <Badge
                      variant={selectedTech === tech ? 'solid' : 'outline'}
                      colorScheme={selectedTech === tech ? 'blue' : 'gray'}
                      cursor="pointer"
                      onClick={() => setSelectedTech(tech)}
                      px={3}
                      py={1}
                      borderRadius="full"
                      fontSize="sm"
                      transition="all 0.2s"
                      _hover={{ transform: "scale(1.05)" }}
                    >
                      {tech} ({count})
                    </Badge>
                  </WrapItem>
                );
              })}
            </Wrap>
            
            {/* 結果表示 */}
            <Box pt={2} borderTop="1px" borderColor={borderColor}>
              <Text fontSize="sm" color={textColor}>
                {filteredProjects.length}件のプロジェクトを表示中
                {selectedTech !== 'all' && ` (「${selectedTech}」でフィルタリング)`}
              </Text>
            </Box>
          </VStack>
        </Box>

        {/* プロジェクトグリッド */}
        <Box w="100%">
          {filteredProjects.length > 0 ? (
            <SimpleGrid
              columns={{ base: 1, sm: 2, lg: 3, xl: 4 }}
              spacing={{ base: 6, md: 8 }}
              w="100%"
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={index}
                  title={project.title}
                  authors={project.authors}
                  date={project.date}
                  technologies={project.technologies}
                  youtubeUrl={project.youtubeUrl}
                  description={project.description}
                  deployLink={project.deployLink}
                  githubLink={project.githubLink}
                  articleLink={project.articleLink}
                />
              ))}
            </SimpleGrid>
          ) : (
            <Box textAlign="center" py={12}>
              <Icon as={FaCode} boxSize={12} color="gray.400" mb={4} />
              <Text fontSize="lg" color={textColor} mb={2}>
                選択した技術スタックのプロジェクトが見つかりません
              </Text>
              <Text fontSize="sm" color="gray.400">
                別の技術スタックを選択するか、「すべて」を選択してください
              </Text>
            </Box>
          )}
        </Box>
      </VStack>
    </Container>
  );
};

export default Production;
