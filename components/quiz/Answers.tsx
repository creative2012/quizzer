import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BsGenderMale, BsGenderFemale, BsGenderTrans } from 'react-icons/bs';
import { Button } from '@mui/material';


interface QuestionsProps {
  onClick: (e: any) => void;
  delay: number;
  answers: any;
  keyValue: number;
}
const Answers: React.FC<QuestionsProps> = ({ onClick, delay, answers, keyValue }) => {
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
            <Button
              key={'A' + keyValue + 1}
              onClick={() => onClick(answers[0])}
              value={answers[0]}
              variant='contained'
              className='group noTrans text-xl relative flex flex-row gap-2 items-center shadow-md p-4 rounded-md bg-[#455a64]  text-white hover:shadow-lg transition transform hover:scale-110'
            >
              <div className="absolute left-4 font-bold">A</div> {answers[0]}
            </Button>
          )}
          {answers[1] && (
            <Button
              key={'A' + keyValue + 1}
              onClick={() => onClick(answers[1])}
              value={answers[1]}
              variant='contained'
              className='group noTrans text-xl relative flex flex-col gap-2 items-center  shadow-md p-4 rounded-md bg-[#455a64]  text-white hover:shadow-lg transition transform hover:scale-110'
            >
             <div className="absolute left-4 font-bold">B</div>  {answers[1]}
            </Button>
          )}
          {answers[2] && (
            <Button
              key={'A' + keyValue + 1}
              onClick={() => onClick(answers[2])}
              value={answers[2]}
              variant='contained'
              className='group noTrans text-xl relative flex flex-col gap-2 items-center  shadow-md p-4 rounded-md bg-[#455a64]  text-white hover:shadow-lg transition transform hover:scale-110'
            >
              <div className="absolute left-4 font-bold">C</div> {answers[2]}
            </Button>
          )}
          {answers[3] && (
            <Button
              key={'A' + keyValue + 1}
              onClick={() => onClick(answers[3])}
              value={answers[3]}
              variant='contained'
              className='group noTrans text-xl relative flex flex-col gap-2 items-center  shadow-md p-4 rounded-md bg-[#455a64]  text-white hover:shadow-lg transition transform hover:scale-110'
            >
              <div className="absolute left-4 font-bold">D</div> {answers[3]}
            </Button>
          )}
          {!answers[0] && (
            <Button
              key={'A' + keyValue + 1}
              onClick={() => onClick('get')}
              value='get'
              variant='contained'
              className='group flex flex-col gap-2 items-center  shadow-md p-4 rounded-md bg-[#455a64]  text-white hover:shadow-lg transition transform hover:scale-110'
            >
              Get Results
            </Button>
          )}
        </>
      </motion.div>
    </AnimatePresence>
  );
};

export default Answers;
