"use client";

import LoadingPage from "@/components/common/Loading";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Avatar,
  HStack,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Tooltip,
  useToast,
  Text,
  Flex,
  Badge,
} from "@chakra-ui/react";
import { fetcher, postFetcher } from "@/lib/api/swrFetcher";
import { getCookie } from "@/utils/cookies";
import { useState } from "react";
import useSWR, { KeyedMutator } from "swr";
import useSWRMutation from "swr/mutation";
import { FormInput } from "../common/FormInput";
import { MdAdd } from "react-icons/md";
import { handleErrorToast } from "../common/HandleError";
export interface Team {
  id: string;
  name: string;
  team_leader: string;
  description: string;
  spots_left: number;
  members: Array<{ id: number | string; user: string; avatar: string; role?: string }>;
}

type TeamsResponse = {
  message: Team[];
};

export default function Teams() {
  const { data, error, isLoading, mutate } = useSWR<TeamsResponse, Error>(
    "/api/method/hackathon.API.teams.get_all_teams",
    fetcher
  );

  if (isLoading) {
    return <LoadingPage />;
  }

  if (data && data.message) {
    return <ListTeam data={data.message} mutate={mutate} />;
  }
}

const ListTeam = ({ data, mutate }: { data: Team[]; mutate: KeyedMutator<TeamsResponse> }) => {
  const [teamName, setTeamName] = useState("");
  const currentUser = getCookie("email");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  console.log('email', currentUser)

  const { trigger: addTeam, isMutating: isAdding } = useSWRMutation(
    "/api/method/hackathon.API.teams.add_team",
    postFetcher
  );

  const { trigger: joinTeam, isMutating: isJoining, error: joinTeamError } = useSWRMutation(
    "/api/method/hackathon.API.teams.join_team",
    postFetcher
  );

  const createTeam = async () => {
    if (!teamName || !currentUser) return;
  
    const newTeam = {
      team_name: teamName,
      team_leader: currentUser,
      members: [
        {
          user: currentUser,
          role: "Admin",
        },
      ],
    };
  
    try {
      await addTeam(newTeam);
      mutate();
      onClose();
      toast({
        title: "Team created successfully",
        status: "success",
      });
  
      setTeamName("");
    } catch (err) {
      handleErrorToast(toast, err); 
      console.error("Failed to add team:", err);
    }
  };

  const handleJoinTeam = async (name: string) => {
    if (!currentUser) return;

    try {
      await joinTeam({ team_name: name, user: currentUser })
      mutate()
      toast({
        title: "Joined team successfully",
        status: "success",
      });
    } catch (err) {
      handleErrorToast(toast, err); 
      console.error("Failed to join team:", err);
    }
  };

  return (
    <Stack
      px={{ base: 4, md: "5rem", lg: "5rem" }} // Reduced padding on mobile
      py={{ base: 16, md: 20 }} // Adjusted padding top for mobile
      spacing={{ base: 4, md: 6 }} // Reduced spacing on mobile
      minH="100vh"
    >
      {/* Header Section */}
      <Flex
        justify="space-between"
        align="center"
        direction={{ base: "column", sm: "row" }} // Stack vertically on mobile
        gap={{ base: 4, sm: 0 }}
      >
        <Text
          fontSize={{ base: "xl", md: "2xl" }} // Smaller font on mobile
          fontWeight="bold"
          textAlign={{ base: "center", sm: "left" }}
        >
          Available Teams
        </Text>
        <Button
          onClick={onOpen}
          colorScheme="blue"
          leftIcon={<MdAdd />}
          rounded="full"
          size={{ base: "sm", md: "md" }} // Smaller button on mobile
        >
          Create Team
        </Button>
      </Flex>

      {/* Team Cards Grid Layout */}
      <Stack
        direction="row"
        spacing={{ base: 4, md: 6 }} // Reduced spacing on mobile
        wrap="wrap"
        // justify="center"
        sx={{
          "& > *": {
            flex: {
              base: "1 1 100%", // 1 column on mobile
              sm: "1 1 calc(50% - 1rem)", // 2 columns on small screens
              md: "1 1 calc(33.333% - 1.5rem)", // 3 columns on medium screens
            },
            maxW: {
              base: "100%",
              sm: "calc(50% - 1rem)",
              md: "calc(33.333% - 1.5rem)",
            },
          },
        }}
      >
        {data?.map((team, index) => (
          <Card
            key={index}
            p={{ base: 3, md: 4 }} // Reduced padding on mobile
          >
            <CardHeader p={0}>
              <Flex
                align="start"
                justify="space-between"
                direction={{ base: "column", sm: "row" }} // Stack vertically on mobile
                gap={{ base: 2, sm: 0 }}
              >
                <HStack spacing={{ base: 3, md: 4 }} align="start">
                  <Avatar
                    // src={team.members[0]?.avatar}
                    src={team.members[0]?.avatar ? team.members[0]?.avatar : `https://avatar.iran.liara.run/public/${index + 10}`}

                    // name={team.team_leader.charAt(0)}
                    size={{ base: "md", md: "lg" }} // Smaller avatar on mobile
                  />
                  <Stack spacing={0}>
                    <Text
                      fontSize={{ base: "md", md: "lg" }} // Smaller font on mobile
                      fontWeight="semibold"
                    >
                      {team.name}
                    </Text>
                    <Text
                      fontSize={{ base: "xs", md: "sm" }}
                      color="gray.400"
                    >
                      Led by {team.team_leader}
                    </Text>
                  </Stack>
                </HStack>
                <Badge
                  colorScheme={team.members.length >= 4 ? "red" : "green"}
                  rounded="full"
                  px={{ base: 1.5, md: 2 }}
                  py={1}
                  fontSize={{ base: "xs", md: "xs" }}
                >
                  {6 - team.members.length} spot{team.members.length !== 1 ? "s" : ""} left
                </Badge>
              </Flex>
            </CardHeader>
            <CardBody pt={{ base: 3, md: 4 }} p={0}>
              <Text
                fontSize={{ base: "xs", md: "sm" }}
                color="gray.300"
                mb={{ base: 3, md: 4 }}
                noOfLines={2} // Limit to 2 lines to prevent overflow
              >
                {team.description}
              </Text>
              <Flex
                justify="space-between"
                align="center"
                direction={{ base: "column", sm: "row" }} // Stack vertically on mobile
                gap={{ base: 3, sm: 0 }}
              >
                <HStack spacing={-2}>
                  {team.members.slice(0, 3).map((member, index) => ( // Show only 3 avatars
                    <Tooltip key={index} label={member.user}>
                      <Avatar
                        src={member.avatar ? member.avatar : 'https://avatar.iran.liara.run/public/boy'}
                        // name={member.user.charAt(0).toUpperCase()}
                        size={{ base: "xs", md: "sm" }} // Smaller avatars on mobile
                      />
                    </Tooltip>
                  ))}
                  {team.members.length > 3 && (
                    <Avatar
                      size={{ base: "xs", md: "sm" }}
                      name={`+${team.members.length - 3}`}
                      bg="gray.600"
                      color="white"
                    />
                  )}
                </HStack>
                <Button
                  size={{ base: "sm", md: "sm" }}
                  variant={"secondary"}
                  _hover={{ bg: "blue.600" }}
                  onClick={() => handleJoinTeam(team.name)}
                  isDisabled={isJoining}
                  w={{ base: "full", sm: "auto" }} // Full width on mobile
                >
                  Join Team
                </Button>
              </Flex>
            </CardBody>
          </Card>
        ))}
      </Stack>

      {/* Chakra UI Modal */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "xs", sm: "sm", md: "md" }} // Smaller modal on mobile
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={{ base: "md", md: "lg" }}>
            Create a New Team
          </ModalHeader>
          <ModalBody>
            <FormInput label="Team Name">
              <Input
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Enter team name"
                size={{ base: "sm", md: "md" }} // Smaller input on mobile
              />
            </FormInput>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="ghost"
              onClick={onClose}
              mr={3}
              size={{ base: "sm", md: "md" }}
            >
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={createTeam}
              isLoading={isAdding}
              size={{ base: "sm", md: "md" }}
            >
              Create Team
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
};