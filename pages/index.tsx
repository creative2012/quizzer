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
      className='fixed  text-zinc-700 bg-white w-[100vw] h-[100vh]'
    >
    <QuizList title="Quizzes" data={quizzes} />
    </motion.div>
  );
}
