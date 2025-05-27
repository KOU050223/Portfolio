import "../App.css";
import { Heading, Container, SimpleGrid, Flex } from "@chakra-ui/react";
import { useProjects } from "../hooks/useProjects";
import ProjectCard from "../components/projectCard";

const Production = () => {
  const { projects, isLoading, error } = useProjects();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading projects</div>;

  return (
    <Container maxW="100%" py={10}>
      <Heading size="3xl" textAlign="center" mb={10}>
        作品一覧
      </Heading>
      <Flex justifyContent="center" width="100%">
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
          spacing={{ base: 6, md: 8 }}
          width="100%"
        >
          {projects.map((project, index) => (
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
      </Flex>
    </Container>
  );
};

export default Production;
