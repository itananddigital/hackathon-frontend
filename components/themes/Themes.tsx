"use client";

import Error from "@/app/Error";
import { fetcher } from "@/lib/api/swrFetcher";
import Link from "next/link";
import useSWR from "swr";
import LoadingPage from "../common/Loading";
import { 
  Box, Heading, Text, SimpleGrid, Card, CardBody, Button, Input, InputGroup, InputLeftElement, Icon, Select, Flex, Tag,
  Image
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Themes = () => {
  const router = useRouter();
  const { data, error, isLoading, mutate } = useSWR(
    '/api/method/hackathon.API.themes.get_all_themes',
    fetcher,
  );

  if (isLoading) return <LoadingPage />;
  if (error) return <Error error={error} reset={mutate} />;
  
  if (data && data.message.length) {
    const featuredProject = data.message[0]; // First project as the featured one
    const otherProjects = data.message.slice(1); // Remaining projects

    return (
      <Box px={{ base: 4, md: "5rem" }} py={{ base: 10, md: 8 }} bg="gray.900" color="white">
        {/* Page Heading & Search */}
        <Flex justify="space-between" align="center" mb={6}>
          <Heading size="lg">Available Projects</Heading>
          <Flex gap={3}>
            <InputGroup maxW="300px">
              <InputLeftElement pointerEvents="none">
                <Icon as={FaSearch} color="gray.400" />
              </InputLeftElement>
              <Input placeholder="Search projects..." bg="gray.800" border="none" _focus={{ bg: "gray.700" }} />
            </InputGroup>
            <Select maxW="200px" bg="gray.800" border="none" _focus={{ bg: "gray.700" }}>
              <option>All Categories</option>
              <option>AI & ML</option>
              <option>Web Development</option>
              <option>Blockchain</option>
              <option>Mobile Apps</option>
            </Select>
          </Flex>
        </Flex>

        {/* Featured Project */}
        <Card mb={8} p={6} bg="gray.800" shadow="xl" backgroundImage={`url(http://localhost:8002/${featuredProject.thumbnail})`} backgroundRepeat="no-repeat" backgroundSize="cover" backgroundPosition={"center"}>


          <CardBody mt={{base : 4, md: 40}}>
            <Tag size="lg" colorScheme="blue" mb={2}>Featured</Tag>
            <Heading size="md">{featuredProject.title}</Heading>
            <Text color="gray.400" mt={2}>{featuredProject.description}</Text>
            
            <Button mt={4} colorScheme="blue">
              <Link href={`/themes/${featuredProject.title}`}>See More Details</Link>
            </Button>
          </CardBody>
        </Card>

        {/* Other Projects Grid */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {otherProjects.map((project: { title: string; description: string, thumbnail: string }, index: number) => (
            <Card key={index} bg="gray.800" shadow="lg" _hover={{ shadow: "xl", transform: "translateY(-3px)", cursor: "pointer" }} transition="0.3s" onClick={() => router.push(`/themes/${project.title}`)}>
              <Image src={encodeURI(`http://localhost:8002/${project.thumbnail}`)} alt={project.title} width="100%" height="200" objectFit="cover"  />
              <CardBody pt={4}>
                <Flex justify="space-between" align="center">
                  <Heading size="sm">{project.title}</Heading>
                  <Tag size="sm" colorScheme={index % 2 === 0 ? "green" : "purple"}>
                    {index % 2 === 0 ? "New" : "Popular"}
                  </Tag>
                </Flex>
                <Text color="gray.400" fontSize="sm" mt={2}>{project.description}</Text>
                <Flex align="center" mt={3} gap={2}>
                </Flex>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    );
  }
};

export default Themes;
