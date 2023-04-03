import React from 'react';
import { useRouter } from 'next/router';
import { SiJavascript, SiMongodb, SiReact,SiVuedotjs  } from 'react-icons/si';
import { TbBrandNextjs } from 'react-icons/tb'
import Rating from '@mui/material/Rating';

// import useInfoModal from "@/hooks/useInfoModal";

interface QuizCardProps {
  data: Record<string, any>;
}

const QuizCard: React.FC<QuizCardProps> = ({ data }) => {
  const router = useRouter();

  let Img = SiMongodb;
  let col = 'blue';
  let level = 0;

  if (data.thumbnailUrl === 'js') {
    Img = SiJavascript;
    col = 'yellow';
  }
  if (data.thumbnailUrl === 'mdb') {
    Img = SiMongodb;
    col = 'lightgreen';
  }
  if (data.thumbnailUrl === 'react') {
    Img = SiReact;
    col = 'lightblue';
  }
  if (data.thumbnailUrl === 'next') {
    Img = TbBrandNextjs;
    col = 'black';
  }
  if (data.thumbnailUrl === 'vue') {
    Img = SiVuedotjs;
    col = 'lightgreen';
  }
  if (data.level === 'Beginner') {
    level = 2;
  }
  if (data.level === 'Medium') {
    level = 3;
  }
  if (data.level === 'Advanced') {
    level = 5;
  }

  return (
    <>
      <div
        onClick={() => {
          router.push(`/startQuiz/${data?.id}`);
        }}
        className='w-[300px] group noTrans text-xl flex flex-col gap-8  shadow-md p-4 bg-[#455d64] rounded-md cursor-pointer text-white hover:shadow-lg transition transform hover:scale-110'
      >
        <div className='font-light text-xl self-end gap-2 overflow-hidden'>
          <Img className='absolute top-2 left-2' size={50} color={col} /> {data.title}
        </div>
        <div className='flex flex-col gap-1 self-start'>
          <Rating name='read-only' size='small' value={level} readOnly />
          <div className='text-xs font-light'>{data.level}</div>
        </div>
        <div className='absolute right-4 bottom-4 text-sm text-right w-full'>25 questions</div>
      </div>
    </>
  );
};

export default QuizCard;
