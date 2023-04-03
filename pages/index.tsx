import useQuizList from '@/hooks/useQuizList';
import QuizList from '@/components/QuizList';
import { Button } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';


export default function Home() {
  const { data: quizzes } = useQuizList();


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
      className=' text-zinc-700 bg-white'
    >
       <div className=" fixed z-10 top-0 w-screen h-[200px] bg-[#49acaf] flex items-center justify-center">
    <div className='text-white Bebas text-8xl h-fit'>QUIZZER.</div>

    </div>
    <QuizList title={"Tests"} data={quizzes} />
    <div className="h-[80px] fixed bottom-0 w-screen bg-[#49acaf] flex items-center justify-center"></div>
    </motion.div>
  );
}
