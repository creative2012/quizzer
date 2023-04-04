import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { deepOrange } from '@mui/material/colors';

interface AnswerProps {
  onClick: (e: any) => void;
  delay: number;
  answers: string[];
  keyValue: number;
}

const Answers: React.FC<AnswerProps> = ({ onClick, delay, answers, keyValue }) => {
  if (!answers) {
    return null;
  }

  const alphabet = ['A', 'B', 'C', 'D'];

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={'answers' + keyValue}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{
          opacity: 0,
          y: 50,
          transition: { delay: 0, duration: 0.2, ease: 'easeInOut' },
        }}
        transition={{
          delay: delay,
          duration: 0.2,
          ease: 'easeInOut',
        }}
        className='flex flex-col justify-evenly max-w-xl w-full gap-4 text-xl p-4'
      >
        {answers.map((answer, index) => (
          <div
            key={alphabet[index] + keyValue}
            onClick={() => onClick(answer)}
            className='group hover:bg-[#ff5722] cursor-pointer noTrans text-xl relative flex flex-row gap-2 items-center justify-center shadow-md p-4 rounded-md bg-[#455a64]  text-white hover:shadow-lg transition transform hover:scale-110'
          >
            <div className='absolute left-4 font-bold'>{alphabet[index]}</div> {answer}
          </div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default Answers;
