import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import CountdownTimer from './CountDown';

interface QuizTitleProps {
  data:Record<string, any>;
  start: boolean;
  delay: number;
  startQuiz: () => void;
}
const QuizTitle: React.FC<QuizTitleProps> = ({ data, start, delay, startQuiz }) => {
    return (
        <AnimatePresence mode='wait'>
            <motion.div
              key={data?.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                y: -30,
                transition: { delay: 0, duration: 0.2, ease: 'easeInOut' },
              }}
              transition={{
                delay: delay,
                duration: 0.5,
                ease: 'easeInOut',
                type: 'spring',
                stiffness: 100,
              }}
              className='text flex flex-col gap-4 text-5xl font-semibold Bebas '
            >
              {data?.title}
              {!start && <CountdownTimer initialTime={3} onComplete={startQuiz} />}
            </motion.div>
          </AnimatePresence>

    )
}

export default QuizTitle