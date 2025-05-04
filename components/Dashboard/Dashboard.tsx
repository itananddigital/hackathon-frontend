'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCookie } from "@/utils/cookies";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import useSWR, { KeyedMutator } from "swr";
import { fetcher, postFetcher } from "@/lib/api/swrFetcher";
import LoadingPage from "../LoadingPage";
import { Member } from "../Teams/Teams";
import useSWRMutation from "swr/mutation";
import { handleErrorToast } from "../HandleError";
import { toast } from "sonner";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";

export default function DashboardPage() {
  const currentUser = getCookie("email");

  const { data, isLoading, error, mutate } = useSWR(
    currentUser ? `/api/method/hackathon.API.teams.get_team?user=${currentUser}` : null,
    fetcher
  );

  if (isLoading) return <LoadingPage />;
  if (error) return <div>Error loading dashboard...</div>;

  if (data && data.message) {
    return <Dashboard data={data.message} mutate={mutate} />;
  }
}

const Dashboard = ({ data, mutate }: { data: any, mutate: KeyedMutator<any> }) => {
  const currentUser = getCookie("email");
  const teamInfo = data?.teamInfo;

  const { data: themeData } = useSWR(
    teamInfo?.themes ? `/api/method/hackathon.API.themes.get_themes?name=${teamInfo.themes}` : null,
    fetcher
  );

  const { trigger: leaveTeam, isMutating: isLeaving } = useSWRMutation(
    "/api/method/hackathon.API.teams.leave_team",
    postFetcher
  );

  const { trigger: deleteTeam } = useSWRMutation(
    "/api/method/hackathon.API.teams.delete_team",
    postFetcher
  );

  const { trigger: toggleLock } = useSWRMutation(
    "/api/method/hackathon.API.teams.toggle_lock",
    postFetcher
  );

  const handleLeaveOrDeleteTeam = async () => {
    if (!currentUser) return;
    if (teamInfo.islocked) {
      toast.error('Cannot leave or delete a locked team');
      return;
    }
    try {
      if (teamInfo.team_leader === currentUser) {
        await deleteTeam({ team_name: teamInfo.name, user: currentUser });
        toast('Deleted team successfully');
      } else {
        await leaveTeam({ user: currentUser });
        toast('Left team successfully');
      }
      mutate();
    } catch (err) {
      handleErrorToast(err);
    }
  };

  const handleToggleLock = async () => {
    if (!currentUser || currentUser !== teamInfo.team_leader) return;
    try {
      await toggleLock({
        team_name: teamInfo.name,
        user: currentUser,
        islocked: !teamInfo.islocked,
      });
      toast(`Team ${teamInfo.islocked ? 'unlocked' : 'locked'} successfully`);
      mutate();
    } catch (err) {
      handleErrorToast(err);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-screen">
      <div className="flex-1 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl font-bold">Team Dashboard</h1>
            <p className="text-sm sm:text-base">Welcome back, {currentUser}!</p>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
            <CardTitle className="w-full">
              {teamInfo?.name ? (
                <>
                  <h2 className="text-lg sm:text-xl font-semibold mb-2">Team Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p><strong>Name:</strong> {teamInfo?.name}</p>
                      <p><strong>Leader:</strong> {teamInfo?.team_leader}</p>
                      <p><strong>Members:</strong></p>
                    </div>
                    <div>
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="team-status"
                          checked={teamInfo?.islocked || false}
                          onCheckedChange={handleToggleLock}
                          disabled={teamInfo.team_leader !== currentUser}
                        />
                        <div className="grid gap-1.5 leading-none">
                          <label
                            htmlFor="team-status"
                            className="text-sm font-medium"
                          >
                            Team Status
                          </label>
                          <p className="text-xs text-muted-foreground">
                            Only team leader can lock/unlock team status.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <h2 className="text-xl">Get Started with a Team</h2>
              )}
            </CardTitle>
            {teamInfo?.name && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    disabled={isLeaving}
                    size="sm"
                  >
                    {teamInfo.team_leader === currentUser ? 'Delete Team' : 'Leave Team'}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      {teamInfo.team_leader === currentUser
                        ? 'This action will remove all members and delete the team'
                        : 'This action will remove you from the team'}
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" asChild>
                      <DialogClose>Cancel</DialogClose>
                    </Button>
                    <Button onClick={handleLeaveOrDeleteTeam} disabled={isLeaving}>
                      {isLeaving ? 'Processing...' : 'Continue'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </CardHeader>
          <CardContent>
            {teamInfo?.name ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {teamInfo.members.map((member: Member, index: number) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Avatar className="w-16 h-16 sm:w-20 sm:h-20 mx-auto">
                      <AvatarImage src={member.avatar} alt={member.avatar} />
                      <AvatarFallback>
                        {member.user.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <p className="mt-2 text-sm sm:text-md font-medium">{member.full_name}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-tight">
                      {member?.role?.split(' ').map((word: string, i: number) => (
                        <span key={i} className="block">{word}</span>
                      ))}
                    </p>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="mb-4 text-base sm:text-lg">
                  Join a team to collaborate on exciting projects! Connect with others and start building today.
                </p>
                <Link href="/teams">
                  <Button className="rounded-full px-6 py-2">
                    Join Team
                  </Button>
                </Link>
              </motion.div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Current Project</CardTitle>
          </CardHeader>
          <CardContent>
            <Link href={themeData?.message?.name ? `/themes/${themeData.message.name}` : '/themes'}>
              <h3 className="text-base sm:text-lg font-semibold">{themeData?.message?.name || 'Select a project'}</h3>
            </Link>

            <p className="text-sm sm:text-base">{themeData?.message?.description || 'Select a project to get started'}</p>
            <span className="inline-block px-2 py-1 bg-yellow-600 text-xs rounded-full mt-2">
              {themeData?.message?.name ? 'Selected' : 'Not Started'}
            </span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};