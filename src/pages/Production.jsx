import "../App.css";
import { Heading } from "@chakra-ui/react";
import { useProjects } from "../hooks/useProjects";
import { Container, SimpleGrid } from "@chakra-ui/react";
import ProjectCard from "../components/projectCard";

const Production = () => {
  const {projects , isLoading, error} = useProjects();

  console.log(JSON.stringify(projects));

  return (
    <Container maxW="container.xl" py={10}>
      <Heading size={'4xl'} textAlign="center" mb={8}>作品一覧</Heading>
      <SimpleGrid
            columns={{ base: 1, sm: 2, lg: 3 }}
            spacing={{ base: 8, sm: 12, md: 16 }}
            justifyItems="center"
            px={{ base: 2, md: 8 }}
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
      </Container>
  );
};

export default Production;
