import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

const useHighscores = (title: string) => {
  const { data, error, isLoading } = useSWR(`api/highscores/${title}`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    data,
    error,
    isLoading,
  };
};

export default useHighscores;
