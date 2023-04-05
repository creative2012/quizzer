import { motion } from 'framer-motion';
import React, { useState, useEffect, useCallback } from 'react';
import Questions from '@/components/quiz/Questions';
import { LinearProgress } from '@mui/material';
import Answers from '@/components/quiz/Answers';
import { useRouter } from 'next/router';
import useQuiz from '@/hooks/useQuiz';
import { CircularProgress } from '@mui/material';
import useCurrentUser from '@/hooks/useCurrentUser';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@/components/Alert';
import axios from 'axios';
import ShowPoints from '@/components/quiz/ShowPoints';
import Hello from '@/components/quiz/Hello';
import QuizTitle from '@/components/quiz/QuizTitle';

export default function Quiz() {
  type SavingCode = 'success' | 'info' | 'warning' | 'error' | undefined;

  const router = useRouter();
  const {
    query: { quizId },
  } = router;
  const { data, isLoading } = useQuiz(quizId as string);
  const { data: user } = useCurrentUser();

  const [start, setStart] = useState(false);
  const [timeLeft, setTimeLeft] = useState(100);
  const [isRunning, setIsRunning] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [isSaving, setisSaving] = useState<{ msg: string; code: SavingCode }>({
    msg: '',
    code: 'info',
  });
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

  const saveScore = useCallback(async () => {
    setisSaving({ msg: 'Saving...', code: 'info' });
    setOpen(true);
    try {
      const response = await axios.post('/api/saveScore', {
        score: points,
      });
      setTimeout(() => {
        setisSaving({ msg: 'Saved!.', code: 'success' });
        setOpen(true);
      }, 1000);
    } catch (error) {
      setTimeout(() => {
        setisSaving({ msg: 'could not connect to Database', code: 'error' });
        setOpen(true);
      }, 1000);
      console.log(error);
    }
  }, [points]);

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

      delay.question === 0.5 && setDelay({ title: 0, question: 0, options: 1 });

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
      } else {
        setMedal('#CD7F32');
      }

      setPoints(correctAnswers);
      setTimeout(() => {
        saveScore();
      }, 4000);
    }
  }, [answers, data?.question, gameOver, saveScore]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (timeLeft === 0) {
      setTimeLeft(timeLeft + 2);
      handleOption('timeOut');
    }
  }, [timeLeft, handleOption]);
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const action = (
    <div>
      <IconButton size='small' aria-label='close' color='inherit' onClick={handleClose}>
        <CloseIcon fontSize='small' />
      </IconButton>
    </div>
  );

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
        <Hello user={user} />
        <div className='relative bg-[#fdfdfd] min-h-[220px] text-[#455a64] row-span-2 flex flex-col gap-6 items-center justify-center text-center p-4 shadow-md z-10'>
          <QuizTitle data={data} start={start} delay={delay.title} startQuiz={startQuiz} />
          <Questions
            start={start}
            keyValue={progress.question}
            delay={delay.question}
            question={data?.question[progress.question].question}
            gameOver={gameOver}
            msg={'Quiz over! Well done'}
            isSaving={isSaving.msg}
          />
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
          <ShowPoints data={data} points={points} medal={medal} isGameOver={gameOver} />
        </div>
        <div className='text-center relative bottom-4 self-center text-[#49acaf] h-[50px] Bebas text-6xl'>QUIZZER.</div>
      </motion.div>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} action={action}>
        <Alert onClose={handleClose} severity={isSaving.code} sx={{ width: '100%' }}>
          {isSaving.msg}
        </Alert>
      </Snackbar>
    </>
  );
}
