import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface HelloProps {
  questions: {
    question: string;
    correct: string;
  }[];
  isOpen: boolean;
  onClose: () => void;
}
const Review: React.FC<HelloProps> = ({ questions, isOpen, onClose }) => {
  console.log(questions);
  return (
    <AnimatePresence mode='wait'>
      {isOpen && (
        <motion.div
          initial={{ x: '100vw' }}
          animate={{ x: 0 }}
          exit={{
            x: '100vw',
            transition: { delay: 0, duration: 0.5, ease: 'easeInOut' },
          }}
          transition={{
            duration: 0.5,
            ease: 'easeInOut',
          }}
          className='bg-white absolute min-h-screen top-0 left-0 w-full  z-50 flex flex-col gap-4 text-zinc-700 p-8'
        >
          <div onClick={onClose} className='absolute top-4 right-4 text-2xl cursor-pointer transition transform hover:scale-110'>
            X
          </div>
          <span className='Bebas text-3xl'>Questions you got Wrong</span>
          <div className='flex flex-row items-center justify-center gap-4 '>
            <div className='flex flex-col gap-8'>
              {questions.map((item, index) => (
                <div key={index}>
                  <div className='font-semibold grid grid-cols-9'>
                    <span className='col-span-1 mb-2'> Q:</span>
                    <span className='col-span-8'>{item.question}</span>
                  </div>
                  <div className='grid grid-cols-9'>
                  <span className='font-semibold col-span-1'> A:</span>
                    <span className='col-span-8'>{item.correct}</span>
                  </div>
                  </div>
               
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Review;
