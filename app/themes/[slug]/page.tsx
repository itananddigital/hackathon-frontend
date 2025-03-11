'use client'
import LoadingPage from '@/components/common/Loading';
import { Button } from '@/components/ui/button';
import { fetcher, postFetcher } from '@/lib/api/swrFetcher';
import { getCookie } from '@/utils/cookies';
import { useParams } from 'next/navigation';
import { toast } from "sonner";
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

const page = () => {
  const { slug } = useParams()
  const currentUser = getCookie('email')

  const { data, isLoading } = useSWR(
    `/api/method/hackathon.API.themes.get_themes?name=${slug}`,
    fetcher
  );

  const { trigger, isMutating } = useSWRMutation(
    '/api/method/hackathon.API.themes.select_themes',
    postFetcher
  );

  if (isLoading) {
    return <LoadingPage />
  }

  if (data && data.message) {
    const themeData = data.message
    const selectTheme = () => {
      trigger({ 'name': themeData.title, 'user': currentUser })
        .then(() => toast('Successfully selected theme'))
        .catch((err) => {
          toast('Failed to select team', {
            description: err.message
          })
        })
    }

    return (
      <div className='flex flex-col items-center justify-center max-w-6xl mx-auto px-4 pt-20 text-white h-[calc(100vh-4rem)]'>
        <h1 className='text-5xl font-bold'>{themeData.title}</h1>
        <p className='text-2xl'>{themeData.description}</p>
        <Button className='mt-4' onClick={selectTheme} disabled={isMutating}>Loved It! Click Here</Button>
      </div>
    )

  }

}

export default page