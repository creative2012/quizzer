import { AnimatePresence, motion } from 'framer-motion';
import React, { useState, useEffect, useCallback } from 'react';
import Questions from '@/components/quiz/Questions';
import { Button, LinearProgress } from '@mui/material';
import Answers from '@/components/quiz/Answers';
import { useRouter } from 'next/router';
import useQuiz from '@/hooks/useQuiz';
import { CircularProgress } from '@mui/material';
import CountdownTimer from '@/components/quiz/CountDown';
import { GiLaurelsTrophy } from 'react-icons/gi';

export default function Quiz() {
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
  const [medal, setMedal] = useState('white');
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
        setTimeLeft(105);
        setIsRunning(true);
      } else {
        setIsRunning(false);
        setGameOver(true);
      }
      nextQuestion += 1;
      tracker += 100 / (data?.question.length - 1);
      setProgress({ tracker: tracker, question: nextQuestion });
    },
    [data?.question, delay.question, progress.question, progress.tracker]
  );

  useEffect(() => {
    if (gameOver) {
      let totalQuestions = data?.question.length - 1;
      let correctAnswers = 0;

      answers.map((answer, index) => {
        if (answer === data?.question[index].correct) {
          correctAnswers++;
        }
      });

      let percentageCorrect = (correctAnswers / totalQuestions) * 100;

      if (percentageCorrect >= 90) {
        setMedal('#FFD700');
      } else if (percentageCorrect >= 70) {
        setMedal('#C0C0C0');
      } else if (percentageCorrect == 0) {
        setMedal('white');
      }else {
        setMedal('#CD7F32');
      }

      setPoints(correctAnswers);
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
        <div className='text-3xl flex flex-col items-center row-span-1 justify-center text-center z-10 bg-[#49acaf]'>
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
            <div className='flex flex-row items-center justify-center gap-4 font-semibold'>
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
              msg={'Quiz over! Well done'}
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
                  delay: 2,
                  duration: 0.5,
                  ease: 'easeInOut',
                  type: 'spring',
                  stiffness: 100,
                }}
              >
                <div key='1' className='flex flex-col gap-4'>
                  <div key='2' className='text-center text-4xl Bebas'>
                    You got
                  </div>
                  <div key='3' className='text-center'>
                    {points} out of {data?.question.length - 1} questions correct
                  </div>
                  {medal !== 'white' && (
                    <motion.div
                      key='trophy'
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{
                        opacity: 0,
                        y: 50,
                        transition: { delay: 0, duration: 0.2, ease: 'easeInOut' },
                      }}
                      transition={{
                        delay: 3,
                        duration: 0.5,
                        ease: 'easeInOut',
                        type: 'spring',
                        stiffness: 100,
                      }}
                      className='self-center'
                    >
                      <GiLaurelsTrophy key='trophy2' color={medal} size={50} />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        <div className='text-center relative bottom-4 self-center text-[#49acaf] h-[50px] Bebas text-6xl'>QUIZZER.</div>
      </motion.div>
    </>
  );
}
