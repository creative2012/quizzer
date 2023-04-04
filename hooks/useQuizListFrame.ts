import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useQuizList = () => {
  const { data, error, isLoading } = useSWR("api/quizzes/catagory/frameworks", fetcher, {
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
