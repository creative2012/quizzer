import React, { useState, useEffect, useCallback } from 'react';
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
import Review from '@/components/quiz/Review';

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
  const defaultQuizData = {
    title: 'Default title',
    question: [
      {
        question: '',
        answers: ['A','B','C','D'],
        correct: '',
        id: '',
        quizId: '',
      },
    ],
  };
  const {
    query: { quizId },
  } = useRouter();
  const { data: user } = useCurrentUser();
  const { data: shuffleData, isLoading } = useQuiz(quizId as string);
  const [isRunning, setIsRunning] = useState(false);
  const [saved, setSaved] = useState(false);
  const [points, setPoints] = useState<number>();
  const [medal, setMedal] = useState<string>('white');
  const [delay, setDelay] = useState({ title: 1.5, question: 0.5, options: 1 });
  const [progress, setProgress] = useState({ tracker: 0, question: 0 });
  const [data, setData] = useState<QuizData>(defaultQuizData);
  const [open, setOpen] = useState(false);
  const [start, setStart] = useState(false);
  const [timeLeft, setTimeLeft] = useState(100);
  const [answers, setAnswers] = useState<string[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<any[]>([]);
  const [isOpen, setIsOpen] =useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timeScore, setTimeScore] = useState(0);
  const [isSaving, setisSaving] = useState<{ msg: string; code: SavingCode }>({
    msg: '',
    code: 'info',
  });

  const startQuiz = () => {
    setStart(true);
    setIsRunning(true);
  };

  useEffect(() => {
    if (shuffleData) {
      const { questions, ...rest } = shuffleData;
      const shuffledQuestions = [...questions];

      shuffledQuestions.sort(() => Math.random() - 0.5);
      let questionsSet = shuffledQuestions.slice(0, 10);
      questionsSet.push({
        question: '',
        answers: [],
        correct: '',
        id: '',
        quizId: '',
      });

      setData({
        ...rest,
        question: questionsSet,
      });
    }
  }, [shuffleData]);

  const saveScore = useCallback(async () => {
    setSaved(true);
    if (points && points > 0) {
      setOpen(true);
      let score = 0;
      points != undefined ? (score = Math.floor(points * (timeScore / 5))) : (score = 0 * timeScore);
      try {
        const response = await axios.post('/api/saveScore', {
          userId: user?.id,
          quizId,
          score: score,
          medal,
        });
        setisSaving({
          msg: response.data.message,
          code: response.data.message === 'You didnt beat your highscore this time' ? 'info' : 'success',
        });
      } catch (error) {
        setisSaving({ msg: 'Error Saving Score', code: 'error' });
      }
    }

  }, [points, medal, quizId, timeScore, setSaved, setOpen, user?.id, setisSaving]);

  useEffect(() => {
    if (gameOver && !saved) {
      saveScore();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleOption = (e: string) => {
      setIsRunning(false);
      const nextQuestion = progress.question + 1;
      const tracker = progress.tracker + 100 / (data?.question.length - 1);
      setAnswers((prevItems) => [...prevItems, e]);
      setProgress({ tracker, question: nextQuestion });
      setTimeScore(timeLeft + timeScore);
      if (progress.question < data?.question.length - 2) {
        setTimeLeft(105);
        setIsRunning(true);
        setDelay({ title: 0, question: 0, options: 1 });
      } else {
        setIsRunning(false);
        setGameOver(true);
      }
    }


  useEffect(() => {
    if (gameOver && answers.length > 0) {
      let totalQuestions = data?.question.length - 1;
      let correctAnswers = 0;
      let wrongAnswers = [];

      for (let i = 0; i < data.question.length -1; i++) {
        if (answers[i] === data.question[i].correct) {
          correctAnswers++;
        } else {
          wrongAnswers.push({ question: data.question[i].question, correct: data.question[i].correct });
        }
      }
      
      setWrongAnswers(wrongAnswers);

      let percentageCorrect = (correctAnswers / totalQuestions) * 100;

      if (percentageCorrect >= 90) {
        setMedal('#FFD700');
      } else if (percentageCorrect >= 70) {
        setMedal('#C0C0C0');
      } else if (percentageCorrect >= 50) {
        setMedal('#CD7F32');
      } else {
        setMedal('white');
      }

      setPoints(correctAnswers);
    } else {
      setPoints(0);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver]);

  useEffect(() => {
    if (timeLeft === 0) {
      setTimeLeft(timeLeft + 2);
      handleOption('timeOut');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const toggleReview = () =>{
    setIsOpen(!isOpen);
  }
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
        className='z-50 fixed grid grid-cols-1 grid-rows-6 text-zinc-800 bg-white w-[100vw] h-[100vh]'
      >
        <Hello user={user} />
        <div className='relative bg-[#fdfdfd]  text-[#455a64] row-span-1 flex flex-col gap-6  p-4 items-center justify-center text-center shadow-md z-10'>
          <QuizTitle data={data} start={start} delay={delay.title} startQuiz={startQuiz} />
          <Questions
            start={start}
            keyValue={progress.question}
            delay={delay.question}
            question={data?.question[progress.question]?.question}
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
        <div className='flex min-h-[300px] justify-center items-center row-span-3  z-10 '>
          <Answers
            start={start}
            gameOver={gameOver}
            delay={delay.options}
            keyValue={progress.question}
            answers={data?.question[progress.question]?.answers}
            onClick={handleOption}
          />
          <ShowPoints onClick={toggleReview} data={data} points={points} medal={medal} isGameOver={gameOver} />
        </div>
        <div className='text-center row-span-1 relative bottom-0 self-center text-[#49acaf] h-[50px] Bebas text-6xl'>QUIZZER.</div>
      </motion.div>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} action={action}>
        <Alert onClose={handleClose} severity={isSaving.code} sx={{ width: '100%' }}>
          {isSaving.msg}
        </Alert>
      </Snackbar>
      
      <Review isOpen={isOpen} onClose={toggleReview} questions={wrongAnswers}/>
      
    </>
  );
}
