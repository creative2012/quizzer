import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

const useHighscores = (title: string) => {
  const { data, error, isLoading, mutate } = useSWR(`api/highscores/${title}`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    data,
    error,
    isLoading,
    mutate
  };
};

export default useHighscores;
