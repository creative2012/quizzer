import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface AnswerProps {
  onClick: (e: any) => void;
  delay: number;
  answers: string[];
  keyValue: number;
  start: boolean;
  gameOver: boolean;
}

const Answers: React.FC<AnswerProps> = ({ onClick, delay, answers, keyValue, start, gameOver }) => {
  if (!answers) {
    return null;
  }

  const alphabet = ['A', 'B', 'C', 'D'];
  if (start && !gameOver) {
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
          className='flex flex-col justify-evenly max-w-xl w-full gap-4 text-sm p-4'
        >
          {answers.map((answer, index) => (
            <div
              key={alphabet[index] + keyValue}
              onClick={(e) => {
                onClick(answer);
                // Remove the hover effect after 500ms on touch devices
                if ("ontouchstart" in document.documentElement) {
                  setTimeout(() => {
                    e.currentTarget.classList.remove("hover");
                  }, 200);
                }
              }}
              className='group hover:bg-[#ff5722] cursor-pointer noTrans text-sm relative grid grid-cols-6 gap-2 items-center justify-center shadow-md p-4 rounded-md bg-[#455a64]  text-white hover:shadow-lg transition transform hover:scale-110'
            >
              <div className='font-bold'>{alphabet[index]}</div>
              <div className='col-span-5'> {answer}</div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    );
  } else return null;
};

export default Answers;
