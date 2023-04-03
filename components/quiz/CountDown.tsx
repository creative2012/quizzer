import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@mui/material';

interface CountdownTimerProps {
  initialTime: number;
  onComplete: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ initialTime, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning && timeLeft >= 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (timeLeft < 0) {
      onComplete();
    }
  }, [timeLeft, onComplete]);

  const handleStart = () => {
    setIsRunning(true);
  };


  return (
    <>
    {isRunning && (
    <AnimatePresence mode='wait'>
      <motion.div
        key={timeLeft}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{
          opacity: 0,
          x: -10,
          transition: { delay: 0, duration: 0.2, ease: 'easeInOut' },
        }}
        transition={{
          delay: 0,
          duration: 0.5,
          ease: 'easeInOut',
          type: 'spring',
          stiffness: 100,
        }}
      >
        <div>
          <div>{timeLeft === 0 ? 'Good Luck!' : timeLeft}</div>
          
        </div>
      </motion.div>
      
    </AnimatePresence>
    )}
    {!isRunning && (
    <Button onClick={handleStart} disabled={isRunning} 
    className='text-zinc-800 bg-white text-lg font-semibold hover:text-white hover:scale-110 transition transform'
    variant='contained'>
    ready?
  </Button>
  )}
  </>
  );
};

export default CountdownTimer;
