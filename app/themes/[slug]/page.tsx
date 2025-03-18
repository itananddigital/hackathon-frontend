'use client'
import LoadingPage from '@/components/common/Loading';
import { Box, Button, Card, CardBody, Grid, GridItem, Heading, HStack, Icon, Link, SimpleGrid, Stack, Tag, Text, useToast, VStack } from "@chakra-ui/react"
import { fetcher, postFetcher } from '@/lib/api/swrFetcher';
import { getCookie } from '@/utils/cookies';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { handleErrorToast } from '@/components/common/HandleError';
import { IoCalendarNumber, IoCheckmark } from 'react-icons/io5';
import { FaStar, FaTeamspeak } from 'react-icons/fa';

const page = () => {

  const { slug } = useParams()
  const { data, isLoading } = useSWR(
    `/api/method/hackathon.API.themes.get_themes?name=${slug}`,
    fetcher
  );

  if (isLoading) {
    return <LoadingPage />
  }

  if (data && data.message) {
    return <ThemeDetails data={data.message} />
  }
  return null
}

export default page

interface Theme {
  title: string;
  description: string;
}

const ThemeDetails = ({ data }: { data: Theme }) => {
  const currentUser = getCookie('email')
  const toast = useToast()
  const { trigger, isMutating } = useSWRMutation(
    '/api/method/hackathon.API.themes.select_themes',
    postFetcher
  );
  const selectTheme = () => {
    trigger({ 'name': data.title, 'user': currentUser })
      .then(() => toast({ title: 'Successfully selected theme' }))
      .catch((err) => {
        handleErrorToast(toast, err, "Failed to select theme")
      })
  }

  return (
    <Stack
    px={{ base: 4, md: "5rem", lg: "5rem" }}
    py={{ base: 16, md: 20 }}
    >
      <Card mb={8} p={6} bg="gray.800" shadow="xl" backgroundImage={`url(http://localhost:8002/${data.thumbnail})`} backgroundRepeat="no-repeat" backgroundSize="cover"  backgroundPosition={"center"}>


        <CardBody mt={{ base: 4, md: 40 }}>
          <Tag size="lg" colorScheme="blue" mb={2}>Featured</Tag>
          <Heading size="md">{data.title}</Heading>
          <Text color="gray.400" mt={2}>{data.description}</Text>

          <Button mt={4} colorScheme="blue" onClick={selectTheme} disabled={isMutating}>
            🚀 Join Project
          </Button>
        </CardBody>
      </Card>
      <Grid
      templateColumns={{ base: "1fr", md: "70% 30%" }}
      gap={4}
    >
      <GridItem colSpan={1}>
        <ProjectOverview title={data.title} description={data.description} />
      </GridItem>

      <GridItem colSpan={1}>
        <TechnicalRequirements />
      </GridItem>

      <GridItem colSpan={{ base: 1, md: 1 }}>
        <Technologies />
      </GridItem>
    </Grid>
    </Stack>
  )
}


const Technologies = () => {
  const techStack = ["Solidity", "Python", "TensorFlow", "React", "Web3.js", "Docker"];

  return (
    <Box bg="gray.800" color="white" p={6} borderRadius="lg" shadow="md">
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Technologies
      </Text>
      <HStack wrap="wrap" spacing={2}>
        {techStack.map((tech) => (
          <Tag key={tech} colorScheme="blue" size="lg">
            {tech}
          </Tag>
        ))}
      </HStack>
    </Box>
  );
};




const TechnicalRequirements = () => {
  const requirements = [
    "Experience with Solidity and Smart Contracts",
    "Python for AI/ML Development",
    "Web3.js or Ethers.js",
    "React.js for Frontend Development",
  ];

  return (
    <Box bg="gray.800" color="white" p={6} borderRadius="lg" shadow="md">
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Technical Requirements
      </Text>
      <VStack align="start" spacing={3}>
        {requirements.map((req) => (
          <HStack key={req}>
            <Icon as={IoCheckmark} color="green.400" />
            <Text>{req}</Text>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

interface ProjectOverviewProps {
  title: string;
  description: string;
  duration?: string;
  teamSize?: string;
  difficulty?: string;
}

const ProjectOverview = ({title, description, duration, teamSize, difficulty}: ProjectOverviewProps) => {


const projectData = {
  duration: "24 Hours",
  teamSize: "4-6 Members",
  difficulty: "Advanced",
};

  return (
    <Box bg="gray.800" color="white" p={6} borderRadius="lg" shadow="md">
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        {title}
      </Text>
      <Text mb={4}>{description}</Text>

      <VStack align="start" spacing={3}>
        <HStack>
          <Icon as={IoCalendarNumber} color="blue.400" />
          <Text><strong>Duration:</strong> {projectData.duration}</Text>
        </HStack>
        <HStack>
          <Icon as={FaTeamspeak} color="blue.400" />
          <Text><strong>Team Size:</strong> {projectData.teamSize}</Text>
        </HStack>
        <HStack>
          <Icon as={FaStar} color="blue.400" />
          <Text><strong>Difficulty:</strong> {projectData.difficulty}</Text>
        </HStack>
      </VStack>
    </Box>
  );
};

