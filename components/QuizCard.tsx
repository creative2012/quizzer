import React from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import { BiChevronDown } from 'react-icons/bi';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import { SiJavascript, SiMongodb } from 'react-icons/si';

// import useInfoModal from "@/hooks/useInfoModal";

interface QuizCardProps {
  data: Record<string, any>;
}

const QuizCard: React.FC<QuizCardProps> = ({ data }) => {
  const router = useRouter();
  console.log(data);

  let Img = SiMongodb;
  let col = 'blue';

  if (data.title === 'Javascript') {
    Img = SiJavascript;
    col = 'yellow';
  }

  return (
    <>
      <div
        onClick={() => {
          router.push(`/startQuiz/${data?.id}`);
        }}
        className='w-[300px] group noTrans text-xl relative flex flex-col gap-8 items-center shadow-md p-4 bg-[#455a64] rounded-sm cursor-pointer text-white hover:shadow-lg transition transform hover:scale-110'
      >
        <div className='font-semibold text-xl self-end gap-2'>
          <Img className='absolute top-1 left-1' size={50} color={col} /> {data.title}
        </div>
        <div className='text-sm'>{data.description}</div>
      </div>
    </>
  );
};

export default QuizCard;
