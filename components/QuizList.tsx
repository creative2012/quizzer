import React from "react";
import { isEmpty } from "lodash";
import QuizCard from "./QuizCard";

interface QuizListProps {
  data: Record<string, any>[];
  title: string;
}

const QuizList: React.FC<QuizListProps> = ({ data, title }) => {
  if (isEmpty(data)) {
    return null;
  }
  return (
  <div className="px-4 md:px-12 mt-4 space-y-8">
    <div>
        <p className="text-zinc-800 text-md md:text-xl lg:text-2xl font-semibold mb-4">
            {title}
        </p>
        <div className="flex flex-row  gap-2 justify-center md:justify-normal lg:justify-normal">
            {data.map((quiz) => (
                <QuizCard key={quiz.id} data={quiz}/>
            ))}
        </div>
    </div>

  </div>
  );
};

export default QuizList;
