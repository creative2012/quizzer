import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@mui/material';


interface QuestionsProps {
  onClick: (e: any) => void;
  delay: number;
  answers: any;
  keyValue: number;
}
const Answers: React.FC<QuestionsProps> = ({ onClick, delay, answers, keyValue }) => {
  if(!answers){
    return null;
  }

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={'A' + keyValue}
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
        <>
          {answers[0] && (
            <div
              key={'A' + keyValue + 1}
              onClick={() => onClick(answers[0])}
              
              className='group hover:bg-blue-500 cursor-pointer noTrans text-xl relative flex flex-row gap-2 items-center justify-center shadow-md p-4 rounded-md bg-[#455a64]  text-white hover:shadow-lg transition transform hover:scale-110'
            >
              <div className="absolute left-4 font-bold">A</div> {answers[0]}
            </div>
          )}
          {answers[1] && (
            <div
              key={'B' + keyValue + 1}
              onClick={() => onClick(answers[1])}
              
              className='group hover:bg-blue-500  cursor-pointer noTrans text-xl relative flex flex-row gap-2 items-center justify-center shadow-md p-4 rounded-md bg-[#455a64]  text-white hover:shadow-lg transition transform hover:scale-110'
            >
             <div className="absolute left-4 font-bold">B</div>  {answers[1]}
            </div>
          )}
          {answers[2] && (
            <div
              key={'C' + keyValue + 1}
              onClick={() => onClick(answers[2])}
              className='group hover:bg-blue-500  cursor-pointer noTrans text-xl relative flex flex-row gap-2 items-center justify-center shadow-md p-4 rounded-md bg-[#455a64]  text-white hover:shadow-lg transition transform hover:scale-110'
            >
              <div className="absolute left-4 font-bold">C</div> {answers[2]}
            </div>
          )}
          {answers[3] && (
            <div
              key={'D' + keyValue + 1}
              onClick={() => onClick(answers[3])}
              className='group hover:bg-blue-500  cursor-pointer noTrans text-xl relative flex flex-row gap-2 items-center justify-center shadow-md p-4 rounded-md bg-[#455a64]  text-white hover:shadow-lg transition transform hover:scale-110'
            >
              <div className="absolute left-4 font-bold">D</div> {answers[3]}
            </div>
          )}
        </>
      </motion.div>
    </AnimatePresence>
  );
};

export default Answers;
