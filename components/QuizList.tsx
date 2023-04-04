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
  <div className="px-4 min-h-screen pb-[100px] text-white pt-[100px] space-y-8 flex flex-row justify-center md:justify-normal w-screen lg:justify-normal h-full">
    <div>
        <p className=" text-2xl flex items-center justify-center font-semibold mb-8 mt-5 ">
           
        </p>
        <div className="flex flex-row flex-wrap gap-8 justify-evenly">
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
