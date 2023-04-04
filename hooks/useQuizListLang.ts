import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useQuizList = () => {
  const { data, error, isLoading } = useSWR("api/quizzes/catagory/languages", fetcher, {
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
