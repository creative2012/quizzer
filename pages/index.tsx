import useQuizList from '@/hooks/useQuizList';
import QuizList from '@/components/QuizList';
import { motion } from 'framer-motion';
import React from 'react';
import { CircularProgress } from '@mui/material';


export default function Home() {
  const { data: quizzes, isLoading } = useQuizList();

  return (
    <>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
      className=' text-zinc-700 bg-white'
    >
       <div className=" fixed z-10 top-0 w-screen h-[100px] shadow-md bg-[#49acaf] flex items-center justify-center">
    <div className='text-white Bebas text-8xl h-fit'>QUIZZER.</div>

    </div>
    {isLoading && (
      <div className='text-black fixed flex flex-col items-center justify-center gap-4 h-screen w-screen'>
      <CircularProgress color='warning' size={34} />
      Loading...
    </div>
    )}
    <QuizList title={"Tests"} data={quizzes} />
    <div className="h-[40px] text-white fixed bottom-0 w-screen bg-[#49acaf] flex items-center justify-center">
      &copy; Quizzer 2023
    </div>
    </motion.div>
    </>
  );
}
