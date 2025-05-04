"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { fetcher, postFetcher } from "@/lib/api/swrFetcher";
import { getCookie } from "@/utils/cookies";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import useSWR, { KeyedMutator } from "swr";
import useSWRMutation from "swr/mutation";
import { handleErrorToast } from "../HandleError";
import LoadingPage from "../LoadingPage";
import { useIsMobile } from "@/hooks/use-mobile";
import { CONSTANTS } from "@/lib/api/app-config";
import { useScroll, motion } from "framer-motion";

export interface Team {
  id: string;
  name: string;
  team_name: string;
  team_leader: string;
  themes: string;
  members: Member[];
}

export interface Member {
  id: number | string;
  user: string;
  avatar: string;
  role: string;
  full_name: string
}

type TeamsResponse = {
  message: Team[];
};

export default function Teams() {
  const { data, isLoading, mutate } = useSWR<TeamsResponse, Error>(
    "/api/method/hackathon.API.teams.get_all_teams",
    fetcher
  );

  if (isLoading) {
    return <LoadingPage />
  }

  if (data && data.message) {
    return <ListTeam data={data.message} mutate={mutate} />;
  }
}

const ListTeam = ({ data, mutate }: { data: Team[]; mutate: KeyedMutator<TeamsResponse> }) => {
  const [teamName, setTeamName] = useState("");
  const { scrollYProgress } = useScroll();
  const currentUser = getCookie("email");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { trigger: addTeam, isMutating: isAdding } = useSWRMutation(
    "/api/method/hackathon.API.teams.add_team",
    postFetcher
  );

  const { trigger: joinTeam, isMutating: isJoining } = useSWRMutation(
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
      setIsDialogOpen(false);
      toast("Team created successfully");
      setTeamName("");
    } catch (err) {
      handleErrorToast(err);
      console.error("Failed to add team:", err);
    }
  };

  const handleJoinTeam = async (name: string) => {
    if (!currentUser) return;

    try {
      await joinTeam({ team_name: name, user: currentUser });
      mutate();
      toast('Joined team successfully');
    } catch (err) {
      handleErrorToast(err);
      console.error("Failed to join team:", err);
    }
  };
  const isMobile = useIsMobile()

  const userActions = useMemo(() => {
    return data.some((team) => {
      return team.members.some((member) => member.user === currentUser)
    })
  }, [])

  return (
    <div className="inline-padding space-y-6 min-h-screen">
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 w-full h-1 bg-primary origin-left z-50"
      />
      {/* Header Section */}
      <div className="flex flex-row sm:flex-row justify-between items-center gap-4">
        <h1 className="text-xl md:text-2xl font-bold text-center sm:text-left">
          Available Teams
        </h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            {isMobile ? (
              <Button size='icon'>
                <Plus />
              </Button>
            ) : (
              <Button className="rounded-full">
                <Plus className="mr-2 h-4 w-4" /> Create Team
              </Button>
            )}
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-lg md:text-xl">
                Create a New Team
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Team Name</label>
                <Input
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="Enter team name"
                  className="mt-1"
                />
              </div>
            </div>
            <DialogFooter>
              <div className="flex justify-end space-x-4">
                <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={createTeam} loading={isAdding}>
                  Create Team
                </Button>
              </div>

            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      {
        data?.length === 0 && (
          <div className="flex flex-col items-center justify-center space-y-4 h-96">
            <h1 className="text-xl md:text-2xl font-bold text-center sm:text-left">
              No teams available
            </h1>
            <Button onClick={() => setIsDialogOpen(true)}>
              Create a Team
            </Button>
          </div>
        )
      }

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((team, index) => (
            <Card key={index} className="p-3 md:p-4">
              <CardHeader className="p-0">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                  <div className="flex items-start space-x-3 md:space-x-4">
                    <Avatar>
                      <AvatarImage
                        src={
                          `${CONSTANTS.API_BASE_URL}/${team.members[0]?.avatar}` ||
                          `https://avatar.iran.liara.run/public/${index + 10}`
                        }
                      />
                      <AvatarFallback>{team.team_leader.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-0">
                      <CardTitle className="text-md md:text-lg font-semibold">
                        {team.name}
                      </CardTitle>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        Led by {team.team_leader}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={team.members.length >= 4 ? "destructive" : "default"}
                    className="rounded-full text-xs"
                  >
                    {6 - team.members.length} spot left
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-3 md:pt-4 p-0">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                  <TooltipProvider>
                    <div className="flex -space-x-2">
                      {team.members.map((member, index) => (
                        <Tooltip key={index}>
                          <TooltipTrigger asChild>
                            <Avatar>
                              <AvatarImage
                                src={
                                  `${CONSTANTS.API_BASE_URL}/${member.avatar}` ||
                                  "https://avatar.iran.liara.run/public/boy"
                                }
                              />
                              <AvatarFallback>
                                {member.user.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                          </TooltipTrigger>
                          <TooltipContent>{member.user}</TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  </TooltipProvider>
                  {
                    team.members.length < 5 && !userActions && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleJoinTeam(team.name)}
                        loading={isJoining}
                        className="w-full sm:w-auto"
                      >
                        Join Team
                      </Button>
                    )
                  }

                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};