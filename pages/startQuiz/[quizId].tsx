import { AnimatePresence, motion } from 'framer-motion';
import React, { useState, useEffect, useCallback } from 'react';
import Questions from '@/components/quiz/Questions';
import { Button, LinearProgress } from '@mui/material';
import Answers from '@/components/quiz/Answers';
import { useRouter } from 'next/router';
import useQuiz from '@/hooks/useQuiz';
import { CircularProgress } from '@mui/material';
import CountdownTimer from '@/components/quiz/CountDown';

interface Props {}

interface QuizData {
  title: string;
  question: {
    title: string;
    options: string[];
    correct: string;
  }[];
}

export default function Signup(props: Props) {
  const router = useRouter();
  const {
    query: { quizId },
  } = router;
  const { data, isLoading } = useQuiz(quizId as string);

  const [start, setStart] = useState(false);
  const [timeLeft, setTimeLeft] = useState(100);
  const [isRunning, setIsRunning] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [points, setPoints] = useState(0);
  const [delay, setDelay] = useState({
    title: 1.5,
    question: 0.5,
    options: 1,
  });
  const [progress, setProgress] = useState({
    tracker: 0,
    question: 0,
  });

  const startQuiz = () => {
    setStart(true);
    setIsRunning(true);
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 100);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning, timeLeft]);

  const handleOption = useCallback(
    (e: string) => {
      setIsRunning(false);

      let nextQuestion = progress.question;
      let tracker = progress.tracker;

      const newItem = e;
      setAnswers((prevItems) => [...prevItems, newItem]);

      delay.question === 0.5 && { title: 0, question: 0, options: 1 };

      if (progress.question < data?.question.length - 2) {
        nextQuestion += 1;
        setTimeLeft(105);
        setIsRunning(true);
      } else {
        nextQuestion += 1;
        setIsRunning(false);
        setGameOver(true);
      }

      tracker += 100 / (data?.question.length - 1);
      setProgress({ tracker: tracker, question: nextQuestion });
    },
    [data?.question, delay.question, progress.question, progress.tracker]
  );

  useEffect(() => {
    if (gameOver) {
      let newPoints = 0;

      answers.map((answer, index) => {
        if (answer === data?.question[index].correct) {
          newPoints++;
        }
      });

      setPoints(newPoints);
    }
  }, [answers, data?.question, gameOver]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleOption('timeOut');
    }
  }, [timeLeft, handleOption]);

  if (isLoading) {
    return (
      <div className='text-white flex flex-col items-center justify-center gap-4 h-screen w-screen'>
        <CircularProgress color='warning' size={34} />
        Loading...
      </div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
        className='fixed grid grid-cols-1 grid-rows-8 text-zinc-800 bg-white w-[100vw] h-[100vh]'
      >
        <div className='text-3xl flex flex-col items-center row-span-1 justify-center text-center z-10 bg-[#f25771]'>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: -50,
              transition: { delay: 0, duration: 0.2, ease: 'easeInOut' },
            }}
            transition={{
              delay: 0.8,
              duration: 0.2,
              ease: 'easeInOut',
              type: 'spring',
              stiffness: 100,
            }}
            className='flex flex-col gap-4 text-white'
          >
            <span className='Pacifico text-7xl'>Hello </span>
            {/* profile image display */}
            <div className='flex flex-row items-center justify-center gap-4 font-semibold'>
              {/* profile picture */}
              <div>Paul</div>
            </div>
          </motion.div>
        </div>
        {/* question Title */}

        <div className='relative bg-[#fdfdfd] min-h-[220px] text-[#455a64] row-span-2 flex flex-col gap-6 items-center justify-center text-center p-4 shadow-md z-10'>
          {/* section title */}
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
                delay: delay.title,
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

          {/* questions */}
          {start && (
            <Questions
              keyValue={progress.question}
              delay={delay.question}
              question={data?.question[progress.question].question}
              gameOver={gameOver}
              msg={'Saving your results...'}
            />
          )}
          <div className='absolute z-10 bottom-0 w-full'>
            <LinearProgress key='timeLeft' color='secondary' variant='determinate' value={timeLeft} />
          </div>
          <div className='absolute z-10 top-0 w-full'>
            <LinearProgress key='progress' color='primary' variant='determinate' value={progress.tracker} />
          </div>
        </div>

        {/* answers */}
        <div className='flex min-h-[300px] justify-center items-center row-span-2  z-10 '>
          {start && !gameOver && (
            <>
              <Answers
                delay={delay.options}
                keyValue={progress.question}
                answers={data?.question[progress.question]?.answers}
                onClick={handleOption}
              />
            </>
          )}
          {gameOver && (
            <AnimatePresence mode='wait'>
            <motion.div
              key={data?.title}
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{
                opacity: 0,
                y: -30,
                transition: { delay: 0, duration: 0.2, ease: 'easeInOut' },
              }}
              transition={{
                delay: 0.5,
                duration: 0.5,
                ease: 'easeInOut',
                type: 'spring',
                stiffness: 100,
              }}
              
            >
            <div key="1" className='flex- felx-col'>
              <div key="2" className='text-center text-4xl Bebas'>Your got</div>
              <div key="3" className='text-center'>
                {points} out of {data?.question.length - 1} questions correct
              </div>
            </div>
            </motion.div>
            </AnimatePresence>
          )}
        </div>

        <div className='text-center relative bottom-1 self-center text-[#f25771] h-[50px] Bebas text-6xl'>QUIZZER.</div>
      </motion.div>
    </>
  );
}
