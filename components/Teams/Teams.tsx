"use client";

import { FormInput } from "@/components/common/FormInput";
import LoadingPage from "@/components/common/Loading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { fetcher, postFetcher } from "@/lib/api/swrFetcher";
import { getCookie } from "@/utils/cookies";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import useSWR, { KeyedMutator } from "swr";
import useSWRMutation from "swr/mutation";

export interface Team {
    id: string;
    name: string;
    team_leader: string;
    members: Array<{ id: number | string, user: string, avatar: string, role?: string }>
}
type TeamsResponse = {
    message: Team[];
};

export default function Teams() {
   
    const { data, error, isLoading, mutate } = useSWR<TeamsResponse, Error>(
        '/api/method/hackathon.API.teams.get_all_teams', fetcher
    );

    if (isLoading) {
        return (
            <LoadingPage />
        )
    }

    if (data && data.message) {
        return <ListTeam data={data.message} mutate={mutate}/>
    }

}


const ListTeam = ({data, mutate } : {data: Team[], mutate: KeyedMutator<TeamsResponse>}) => {

    const [teamName, setTeamName] = useState("");
    const currentUser = getCookie('email');
    const [open, setOpen] = useState(false);
    const { trigger: addTeam, isMutating: isAdding } = useSWRMutation(
        '/api/method/hackathon.API.teams.add_team', postFetcher
    );

    const { trigger: joinTeam, isMutating: isJoining } = useSWRMutation(
        '/api/method/hackathon.API.teams.join_team', postFetcher
    );

    const createTeam = async () => {
        if (!teamName || !currentUser) return;
        const newTeam = {
            team_name: teamName,
            team_leader: currentUser,
            members: [
                {
                    user: currentUser,
                    role: 'Admin',
                },
            ],
        };

        try {
            await addTeam(newTeam).then(() => {
                mutate()
                setOpen(false)
            });
            setTeamName('');
        } catch (err) {
            console.error('Failed to add team:', err);
        }
    };

    const handleJoinTeam = async (name: string) => {
        if (!currentUser) return;

        try {
            await joinTeam({ team_name: name, user: currentUser }).then(() => mutate());
            // Payload is just the team ID
        } catch (err) {
            toast('Failed to join team', {
                description: 'Failed to join team',
            })
            console.error('Failed to join team:', err);
        }
    };

    return (
        <div className="pt-20 max-w-6xl mx-auto bg-black text-white min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Available Teams</h2>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button variant="ghost" className="flex items-center gap-2">
                            <Plus size={18} /> Create Team
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="p-6 bg-gray-900 bg-white text-black rounded-lg">
                        <DialogTitle className="text-lg font-semibold mb-3">Create a New Team</DialogTitle>
                        <FormInput label="Team Name">
                            <Input
                                value={teamName}
                                onChange={(e) => setTeamName(e.target.value)}
                                placeholder="Enter team name"
                            />
                        </FormInput>
                        <Button onClick={createTeam} className="w-full mt-4">
                            Create Team
                        </Button>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Team Cards Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {data?.map((team, index) => (
                    <Card key={index} className="bg-gray-800 text-white">
                        <CardHeader>
                            <CardTitle>{team.name}</CardTitle>
                            <p className="text-sm text-gray-400">Team Lead: {team.team_leader}</p>

                        </CardHeader>
                        <CardContent className="flex justify-between items-center">
                            <div className="flex -space-x-2">
                                {team.members.map((member, index) => (
                                    <TooltipProvider key={index}>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Avatar className="border-2 border-gray-800">
                                                    <AvatarImage src={member.avatar} alt={member.user} />
                                                    <AvatarFallback className="bg-gray-600" title={member.user.charAt(0).toUpperCase()}>
                                                        {member.user.charAt(0).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                            </TooltipTrigger>
                                            <TooltipContent className="">
                                                <p className="text-sm">{member.user}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                ))}
                            </div>
                            <Button size="sm" variant="secondary" onClick={() => handleJoinTeam(team.name)} disabled={isJoining}>
                                Join
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}