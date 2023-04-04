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
    <>
  <div className="custScroll-x px-4 text-white space-y-8 flex flex-row justify-normal w-screen shadow-md pb-8 overflow-x-auto">
    <div>
        <p className="absolute left-8 text-2xl flex items-center justify-start font-light mb-4 mt-5 Bebas">
           {title}
        </p>
        <div className="pt-16"></div>
        <div className="flex flex-row gap-8 justify-evenly ">
            {data.map((quiz) => (
                <QuizCard key={quiz.id} data={quiz}/>
            ))}
        </div>
    </div>
              
  </div>
  </>
  );
};

export default QuizList;
