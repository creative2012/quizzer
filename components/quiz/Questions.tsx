import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CircularProgress } from '@mui/material';

interface QuestionsProps {
  delay: number;
  question: string;
  keyValue: number;
  gameOver: boolean;
  msg: string;
}
const Questions: React.FC<QuestionsProps> = ({ keyValue, delay, question, gameOver, msg }) => {
  return (
    <AnimatePresence mode='wait'>
    <motion.div key={'Q'+ keyValue}
    initial={{ x: 50, opacity: 0 }}
    animate={{ x: 0,opacity: 1 }}
    exit={{ x: -50 ,opacity: 0, transition:{
      duration: 0.5,
      ease: "easeInOut",
      type: "spring",
      stiffness: 260,
      damping: 20,
    } }}
    transition={{
      delay: delay,
      duration: 0.5,
      ease: "easeInOut",
      type: "spring",
      stiffness: 260,
      damping: 20,
      }}
      className="self-center text-2xl flex flex-row items-center gap-6"
    >
      <div key={'Q'+ keyValue + 1}>{question}</div>{ gameOver  &&(
        <motion.div key={'Q'+ keyValue}
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0,opacity: 1 }}
        exit={{ x: -50 ,opacity: 0, transition:{
          duration: 0.5,
          ease: "easeInOut",
          type: "spring",
          stiffness: 260,
          damping: 20,
        } }}
        transition={{
          delay: 1.5,
          duration: 0.5,
          ease: "easeInOut",
          type: "spring",
          stiffness: 260,
          damping: 20,
          }}
          className="self-center text-2xl flex flex-row items-center gap-6"
        >
      {msg}  {msg === 'Saving your results...' &&(<CircularProgress key={'Q'+ keyValue+2} color='primary' size={24} /> )}
      
      </motion.div>
      )}
    </motion.div>
    </AnimatePresence>
  );
};

export default Questions;
