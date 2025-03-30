"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { fetcher } from "@/lib/api/swrFetcher";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import LoadingPage from "../LoadingPage";
import { CONSTANTS } from "@/lib/api/app-config";

const Themes = () => {
    const router = useRouter();
    const { data, error, isLoading } = useSWR(
        "/api/method/hackathon.API.themes.get_all_themes",
        fetcher
    );

    if (isLoading) return <LoadingPage />;
    if (error) return <div>Error loading themes...</div>;

    if (data && data?.message?.length) {
        const featuredProject = data.message[0];
        const otherProjects = data.message.slice(1);

        return (
            <div className="inline-padding">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                    <h1 className="text-xl md:text-2xl font-bold text-center sm:text-left">
                        Available Projects
                    </h1>
                </div>

                <Card
                    className="mb-8 p-6  shadow-xl bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url(${CONSTANTS.API_BASE_URL}/${encodeURI(featuredProject.thumbnail)})`,
                    }}
                >
                    <CardContent className="mt-4 md:mt-40">
                        <Badge variant="default" className="mb-2 bg-blue-600 text-white">
                            Featured
                        </Badge>
                        <CardTitle className="text-lg md:text-xl font-semibold">
                            {featuredProject.title}
                        </CardTitle>
                        <p className="text-gray-400 mt-2">{featuredProject.description}</p>
                        <Button asChild className="mt-4">
                            <Link href={`/themes/${featuredProject.title}`}>
                                See More Details
                            </Link>
                        </Button>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {otherProjects.map(
                        (
                            project: { title: string; description: string; thumbnail: string },
                            index: number
                        ) => (
                            <Card
                                key={index}
                                className="shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer pt-0 overflow-hidden"
                                onClick={() => router.push(`/themes/${project.title}`)}
                            >
                                <Image
                                    src={encodeURI(`${CONSTANTS.API_BASE_URL}/${project.thumbnail}`)}
                                    alt={project.title}
                                    width={400}
                                    height={200}
                                    className="w-full h-[200px] object-cover"
                                />
                                <CardHeader className="pt-4 pb-0">
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="text-sm md:text-base font-semibold">
                                            {project.title}
                                        </CardTitle>
                                        <Badge
                                            variant={index % 2 === 0 ? "default" : "secondary"}
                                            className={index % 2 === 0 ? "bg-green-600" : "bg-purple-600"}
                                        >
                                            {index % 2 === 0 ? "New" : "Popular"}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-2">
                                    <p className="text-sm text-gray-400">
                                        {project.description}
                                    </p>
                                </CardContent>
                            </Card>
                        )
                    )}
                </div>
            </div>
        );
    }
};

export default Themes;