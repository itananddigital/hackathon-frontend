'use client';

import { useParams } from 'next/navigation';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { fetcher, postFetcher } from '@/lib/api/swrFetcher';
import { getCookie } from '@/utils/cookies';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Calendar, Users, Star } from 'lucide-react';
import LoadingPage from '@/components/LoadingPage';
import { toast } from 'sonner';

const Themes = () => {
  const { slug } = useParams();
  const { data, isLoading } = useSWR(
    `/api/method/hackathon.API.themes.get_themes?name=${slug}`,
    fetcher
  );

  if (isLoading) {
    return <LoadingPage />;
  }

  if (data && data.message) {
    return <ThemeDetails data={data.message} />;
  }
  return null;
};

export default Themes;

interface Theme {
  title: string;
  description: string;
  thumbnail: string;
}

const ThemeDetails = ({ data }: { data: Theme }) => {
  const currentUser = getCookie('email');
  const { trigger, isMutating } = useSWRMutation(
    '/api/method/hackathon.API.themes.select_themes',
    postFetcher
  );

  const selectTheme = () => {
    trigger({ name: data.title, user: currentUser })
      .then(() =>
        toast('Successfully selected theme')
      )
      .catch((err) => {
        console.error(err);
    });
  };

  return (
    <div className="px-4 md:px-12 ">
      <Card
        className="mb-8 p-6 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${process.env.BASE_URL}/${data.thumbnail})` }}
      >
        <CardContent className="mt-4 md:mt-40">
          <Badge className="mb-2 bg-blue-500">Featured</Badge>
          <h2 className="text-md font-bold">{data.title}</h2>
          <p className="mt-2">{data.description}</p>
          <Button className="mt-4" onClick={selectTheme} disabled={isMutating}>
            🚀 Join Project
          </Button>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[70%_30%]">
        <ProjectOverview title={data.title} description={data.description} />
        <TechnicalRequirements />
        <div className="col-span-1">
          <Technologies />
        </div>
      </div>
    </div>
  );
};


const Technologies = () => {
  const techStack = ['Solidity', 'Python', 'TensorFlow', 'React', 'Web3.js', 'Docker'];

  return (
    <Card>
      <CardHeader>
        <h3 className="text-xl font-bold">Technologies</h3>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <Badge key={tech} className="text-sm">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const TechnicalRequirements = () => {
  const requirements = [
    'Experience with Solidity and Smart Contracts',
    'Python for AI/ML Development',
    'Web3.js or Ethers.js',
    'React.js for Frontend Development',
  ];

  return (
    <Card>
      <CardHeader>
        <h3 className="text-xl font-bold">Technical Requirements</h3>
      </CardHeader>
      <CardContent>
        <ul>
          {requirements.map((req) => (
            <li key={req} className="flex items-center">
              <Check className="mr-2 h-5 w-5" />
              <span>{req}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

interface ProjectOverviewProps {
  title: string;
  description: string;
  duration?: string;
  teamSize?: string;
  difficulty?: string;
}

const ProjectOverview = ({
  title,
  description,
  duration = '24 Hours',
  teamSize = '4-6 Members',
  difficulty = 'Advanced',
}: ProjectOverviewProps) => {
  const projectData = { duration, teamSize, difficulty };

  return (
    <Card>
      <CardHeader>
        <h3 className="text-xl font-bold">{title}</h3>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{description}</p>
        <ul className="space-y-3">
          <li className="flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            <span>
              <strong>Duration:</strong> {projectData.duration}
            </span>
          </li>
          <li className="flex items-center">
            <Users className="mr-2 h-5 w-5" />
            <span>
              <strong>Team Size:</strong> {projectData.teamSize}
            </span>
          </li>
          <li className="flex items-center">
            <Star className="mr-2 h-5 w-5" />
            <span>
              <strong>Difficulty:</strong> {projectData.difficulty}
            </span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};