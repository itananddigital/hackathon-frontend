"use client";

import Error from "@/app/Error";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fetcher } from "@/lib/api/swrFetcher";
import Link from "next/link";
import useSWR from "swr";
import LoadingPage from "../common/Loading";

const Themes = () => {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/method/hackathon.API.themes.get_all_themes',
    fetcher,
  );

  if (isLoading) {
    return <LoadingPage />
  }
  if (error) {
    return <Error error={error} reset={mutate} />
  }
  
  if (data && data.message.length) {
    return (
      <div className="max-w-6xl mx-auto mt-20 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4 text-white">Open Source Project Ideas</h1>
          <p className="text-gray-400">
            Discover innovative project ideas and collaborate with like-minded individuals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.message?.map((project: { "title": string, "description": string }) => (
            <Card key={project.title} className="p-4 bg-gray-900 text-white shadow-lg hover:shadow-xl transition">
              <CardContent>
                <h2 className="text-lg font-semibold">{project.title}</h2>
                <p className="text-gray-400 text-sm mt-2">{project.description}</p>
                <Button variant="default" className="mt-20 bg-white text-black">
                  <Link href={`/themes/${project.title}`}>
                    See More Details
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }
}


export default Themes