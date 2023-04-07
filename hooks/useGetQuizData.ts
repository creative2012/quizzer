import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

const useGetQuizData = () => {
  const { data, error, isLoading, mutate } = useSWR(`api/quiz`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useGetQuizData;
