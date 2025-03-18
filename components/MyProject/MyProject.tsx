'use client';

import { fetcher } from '@/lib/api/swrFetcher';
import React from 'react';
import useSWR from 'swr';
import LoadingPage from '../common/Loading';
import { getCookie } from '@/utils/cookies';
import { Button } from "@chakra-ui/react"
import { Card, CardContent, CardHeader, CardHeader } from '@/components/ui/card';
import Link from 'next/link';

const MyProject = () => {
  const currentUser = getCookie('email');
  const { data, error, isLoading } = useSWR(
    `/api/method/hackathon.API.themes.get_user_themes?user=${currentUser}`,
    fetcher
  );

  if (isLoading) {
    return <LoadingPage />;
  }

  if (data && data.message && !error) {
    return (
      <div className="flex flex-col items-center justify-center max-w-6xl mx-auto px-4 pt-20 text-white h-[calc(100vh-4rem)]">
        <h1 className="text-5xl font-bold">{data.message.title}</h1>
        <p className="text-2xl">{data.message.description}</p>
      </div>
    );
  }

  if (error) {
      const errorMessage = error?.response?.data?._server_messages || 'An unexpected error occurred';
      console.log(error?.response?.data?._server_messages)

    if (errorMessage.includes('User is not part of any team')) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-4">
          <Card className="w-full max-w-md bg-gray-800 border-gray-700 shadow-lg">
            <CardHeader className="border-b border-gray-700">
              <CardHeader className="text-2xl font-bold text-white">
                No Team Found
              </CardHeader>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <p className="text-gray-300">
                You are not a part of a team yet.
              </p>
              <div className="flex space-x-4">
                <Button asChild >
                  <Link href="/teams">Join a Team</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    if (errorMessage.includes('Team has not selected any themes')) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-4">
          <Card className="w-full max-w-md bg-gray-800 border-gray-700 shadow-lg">
            <CardHeader className="border-b border-gray-700">
              <CardHeader className="text-2xl font-bold text-white">
                No Themes Selected
              </CardHeader>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <p className="text-gray-300">
                Your team has not selected any themes yet.
              </p>
              <Button asChild >
                <Link href="/themes">Select Themes</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-4">
        <Card className="w-full max-w-md bg-gray-800 border-gray-700 shadow-lg">
          <CardHeader className="border-b border-gray-700">
            <CardHeader className="text-2xl font-bold text-white">
              Error
            </CardHeader>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-gray-300">{errorMessage}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <p>No data available</p>
    </div>
  );
};

export default MyProject;