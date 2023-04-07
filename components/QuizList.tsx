import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import QuizCard from './QuizCard';
import { motion } from 'framer-motion';
import { CircularProgress } from '@mui/material';
import ScrollContainer from 'react-indiana-drag-scroll'

interface QuizListProps {
  data: Record<string, any>[];
  title: string;
  loading: boolean;
  msg?: string
}
const boxVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.3, ease: 'easeInOut', duration: 0.5 },
  },
};

const QuizList: React.FC<QuizListProps> = ({ data, title, loading, msg }) => {
  // We will use React useRef hook to reference the wrapping div:

  if (isEmpty(data)) {
    return null;
  }

  return (
    <motion.div
      key={title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
      }}
      transition={{
        delay: 0.5,
        duration: 0.5,
        ease: 'easeInOut',
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
    >
      {msg && (        <p key="quizmsg" className="px-10 text-white">{msg}</p>
)}
      <ScrollContainer hideScrollbars={false} vertical={false} className='relative custScroll-x px-4 text-white space-y-8 flex flex-row  justify-normal w-screen  pb-8 overflow-x-scroll' >
        {loading && (
          <div className='absolute w-full h-full  text-black flex flex-col items-center justify-center z-50 gap-4 top-0 left-0'>
            <CircularProgress color='warning' size={34} />
            Loading...
          </div>
        )}
        <p className='sticky  whitespace-nowrap w-[20px] left-8 pt-5 text-2xl flex self-start items-center justify-start font-light  Bebas'>
          {title}
        </p>
        <div>
          <div className='relative pt-8 -left-10'></div>
          <motion.div
            variants={boxVariants}
            initial='initial'
            animate='animate'
            className='flex flex-row gap-8 justify-evenly '
          >
            {data.map((quiz) => (
              <QuizCard key={quiz.id} data={quiz} />
            ))}
            <div className='w-[150px]'></div>
          </motion.div>
        </div>
      </ScrollContainer>
    </motion.div>
  );
};

export default QuizList;
