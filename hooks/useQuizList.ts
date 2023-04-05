import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

const useQuizList = (url: string) => {
  const { data, error, isLoading } = useSWR(`api/quizzes/catagory/${url}`, fetcher, {
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

export default useQuizList;
