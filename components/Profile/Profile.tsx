'use client';

import { fetcher } from '@/lib/api/swrFetcher';
import { getCookie } from '@/utils/cookies';
import useSWR from 'swr';
import LoadingPage from '../common/Loading';
import ViewProfile from './ViewProfile';

const Profile = () => {
  const currentUser = getCookie('email');
  const { data, error, isLoading, mutate } = useSWR(
    `/api/method/hackathon.API.user.get_profile?user=${currentUser}`,
    fetcher
  );

  if (isLoading) return <LoadingPage />;

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p className="text-red-400">Failed to load profile: {error.message}</p>
      </div>
    );
  }

  if(data && data.message){
    return <ViewProfile data={data.message} mutate={mutate}/>
  }
  
  return null
  
};

export default Profile;