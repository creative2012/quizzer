import React from 'react';
import { isEmpty } from 'lodash';
import QuizCard from './QuizCard';
import { motion, AnimatePresence } from 'framer-motion';
import { CircularProgress } from '@mui/material';

interface QuizListProps {
  data: Record<string, any>[];
  title: string;
  loading: boolean;
}

const QuizList: React.FC<QuizListProps> = ({ data, title, loading }) => {
  if (isEmpty(data)) {
    return null;
  }

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={title}
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{
          x: -50,
          opacity: 0,
          transition: {
            duration: 0.5,
            ease: 'easeInOut',
            type: 'spring',
            stiffness: 260,
            damping: 20,
          },
        }}
        transition={{
          delay: 0.5,
          duration: 0.5,
          ease: 'easeInOut',
          type: 'spring',
          stiffness: 260,
          damping: 20,
          staggerChildren: 5,
        }}
      >
        <div className='relative custScroll-x px-4 text-white space-y-8 flex flex-row justify-normal w-screen  pb-8 overflow-x-scroll'>
        {loading && (
          <div className='absolute w-full h-full  text-black flex flex-col items-center justify-center z-50 gap-4   top-0 left-0'>
          <CircularProgress color='warning' size={34} />
          Loading...
        </div>
        )}
          <div>
            <p className='absolute left-8 text-2xl flex items-center justify-start font-light mb-4 mt-5 Bebas'>
              {title}
            </p>
            <div className='pt-16'></div>
            <div className='flex flex-row gap-8 justify-evenly '>
              {data.map((quiz) => (
                <QuizCard key={quiz.id} data={quiz} />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuizList;
