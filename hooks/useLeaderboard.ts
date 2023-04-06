import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

const useHighscores = () => {
  const { data, error, isLoading } = useSWR(`api/highscores`, fetcher, {
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
