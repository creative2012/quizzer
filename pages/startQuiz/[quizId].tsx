import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import useQuiz from '@/hooks/useQuiz';
import useCurrentUser from '@/hooks/useCurrentUser';
import { motion } from 'framer-motion';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { LinearProgress, CircularProgress } from '@mui/material';
import Alert from '@/components/Alert';
import ShowPoints from '@/components/quiz/ShowPoints';
import Hello from '@/components/quiz/Hello';
import QuizTitle from '@/components/quiz/QuizTitle';
import Questions from '@/components/quiz/Questions';
import Answers from '@/components/quiz/Answers';

export default function Quiz() {
  type SavingCode = 'success' | 'info' | 'warning' | 'error' | undefined;
  type QuestionType = {
    question: string;
    answers: string[];
    correct: string;
    id: string;
    quizId: string;
  };

  type QuizData = {
    title: string;
    question: QuestionType[];
  };

  const router = useRouter();
  const {
    query: { quizId },
  } = router;

  const { data: user } = useCurrentUser();
  const [open, setOpen] = useState(false);
  const [start, setStart] = useState(false);
  const [timeLeft, setTimeLeft] = useState(100);
  const [isRunning, setIsRunning] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [saved, SetSaved] = useState(false);
  const [isSaving, setisSaving] = useState<{ msg: string; code: SavingCode }>({
    msg: '',
    code: 'info',
  });
  const [points, setPoints] = useState<number>();
  const [medal, setMedal] = useState<string>('white');
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
  const [data, setData] = useState<QuizData>({
    title: 'Default title',
    question: [
      {
        question: '',
        answers: ['1'],
        correct: '',
        id: '',
        quizId: '',
      },
    ],
  });

  const { data: shuffleData, isLoading } = useQuiz(quizId as string);

  useEffect(() => {
    if (shuffleData) {
      const { question, ...rest } = shuffleData;
      const shuffledQuestions = [...question];

      shuffledQuestions.sort(() => Math.random() - 0.5).slice(0, 15);
      shuffledQuestions.push({
        question: '',
        answers: [],
        correct: '',
        id: '',
        quizId: '',
      });

      setData({
        ...rest,
        question: shuffledQuestions,
      });
    }
  }, [shuffleData]);

  const saveScore = useCallback(async () => {
    setisSaving({ msg: 'Saving...', code: 'info' });
    setOpen(true);
    try {
      const response = await axios.post('/api/saveScore', {
        userId: user.id,
        quizId: quizId,
        score: points,
        medal: medal,
      });
      setTimeout(() => {
        setisSaving({ msg: response.data.message, code: 'success' });
        setOpen(true);
      }, 1000);
    } catch (error) {
      setTimeout(() => {
        setisSaving({ msg: 'Error Saving Score', code: 'error' });
        setOpen(true);
      }, 1000);
    }
    SetSaved(true);
  }, [medal, points, quizId, user.id]);

  useEffect(() => {
    if (gameOver && !saved) {
      saveScore();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points, saveScore]);

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
    }
  }, [answers, data?.question, gameOver, saveScore]);

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
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className='z-50 fixed grid grid-cols-1 grid-rows-8 text-zinc-800 bg-white w-[100vw] h-[100vh]'
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
          />
          <LinearProgress
            className='absolute z-10 bottom-0 w-full'
            key='timeLeft'
            color='secondary'
            variant='determinate'
            value={timeLeft}
          />
          <LinearProgress
            className='absolute z-10 top-0 w-full'
            key='progress'
            color='primary'
            variant='determinate'
            value={progress.tracker}
          />
        </div>
        <div className='flex min-h-[300px] justify-center items-center row-span-2  z-10 '>
          {start && !gameOver && (
            <Answers
              delay={delay.options}
              keyValue={progress.question}
              answers={data?.question[progress.question]?.answers}
              onClick={handleOption}
            />
          )}
          <ShowPoints data={data} points={points} medal={medal} isGameOver={gameOver} />
        </div>
        <div className='text-center relative bottom-4 self-center text-[#49acaf] h-[50px] Bebas text-6xl'>QUIZZER.</div>
      </motion.div>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} action={action}>
        <Alert onClose={handleClose} severity={isSaving.code} sx={{ width: '100%' }}>
          {isSaving.msg}
        </Alert>
      </Snackbar>
    </>
  );
}
