import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import Questions from '@/components/quiz/Questions';
import { LinearProgress } from '@mui/material';
import Answers from '@/components/quiz/Answers';

export default function Signup() {
  const questions = [
    {
      title: 'Javascript',
      question: [
        {
            question: 'Javascript is an _______ language?',
            answers: ['Object-Oriented', 'Object-Based', 'Procedural', 'None of the above'],
            correct: 0
        },
        {
            question: 'Which of the following keywords is used to define a variable in Javascript?',
            answers: ['var', 'let', 'Both A and B', 'None of the above'],
            correct: 2
        },
        {
            question: 'Which of the following methods is used to access HTML elements using Javascript?',
            answers: ['getElementbyId()', 'getElementsByClassName()', 'Both A and B', 'None of the above'],
            correct: 2
        },
        {
            question: 'Upon encountering empty statements, what does the Javascript Interpreter do?',
            answers: ['Throws an error', 'Ignores the statements', 'Gives a warning', 'None of the above'],
            correct: 2
        }
      ],
    },

    {
      title: 'All Done!',
      question: [
        {
            question: 'Getting your results...',
            answers: [],
            correct: ''
        }
      ],
    },
  ];


  const [delay, setDelay] = useState({
    title: 1.5,
    question: 2,
    options: 2.5,
  });

  const [progress, setProgress] = useState({
    tracker: 0,
    section: 0,
    question: 0,
  });

  const [answers, setAnswers] = useState({
    img: '',
    answer: [],
  });

  const handleOption = (e: any) => {
    let nextQuestion = progress.question;
    let nextSection = progress.section;
    let tracker = progress.tracker;
    
     setAnswers(prevState => ({
      ...prevState,
      answer: prevState.answer.concat(e)
    }));

    if (delay.title === 1.5) {
      setDelay({ title: 0, question: 0, options: 1 });
    }

    if (progress.question < questions[progress.section].question.length - 1) {
      nextQuestion += 1;
    } else {
        nextQuestion = 0;
        nextSection += 1;
    }
    tracker += 9;
    setProgress({ section: nextSection, tracker: tracker, question: nextQuestion });
    console.log(e)
  };
  console.log(answers)

  return (
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
            {answers.img && <div className='bg-white rounded-full h-[70px] w-[70px] shadow-xl'></div>}
            <div>Paul</div>
          </div>
        </motion.div>
      </div>
      {/* question Title */}

      <div className='relative bg-[#fdfdfd] text-[#455a64] row-span-2 flex flex-col gap-6 items-center justify-center text-center p-4 shadow-md z-10'>
        {/* section title */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={questions[progress.section].title}
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
            className='text-5xl font-semibold Bebas'
          >
            {questions[progress.section].title}
          </motion.div>
        </AnimatePresence>
        {/* questions */}

        <Questions
          keyValue={progress.question}
          delay={delay.question}
          question={questions[progress.section].question[progress.question].question}
        />

        <LinearProgress
          key='a2'
          variant='determinate'
          value={progress.tracker}
          className='absolute z-10 bottom-0 w-full'
        />
      </div>

      {/* answers */}
      <div className='flex justify-center items-center row-span-2  z-10 '>
        <Answers
          delay={delay.options}
          keyValue={progress.question}
          answers={questions[progress.section].question[progress.question].answers}
          onClick={handleOption}
        />
      </div>
      <div className='text-center text-[#f25771] h-[50px] Bebas text-6xl'>QUIZZER.</div>
    </motion.div>
  );
}
