import QuizList from '@/components/QuizList';
import React, { useState, useCallback, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { OutlinedInputProps } from '@mui/material/OutlinedInput';
import { CircularProgress, FormControl as Form, InputLabel, MenuItem, Select } from '@mui/material';
import Alert from '@/components/Alert';
import { LoadingButton } from '@mui/lab';
import { BiLogInCircle } from 'react-icons/bi';
import axios from 'axios';
import useGetQuizData from '@/hooks/useGetQuizData';

const TextFieldDL = styled((props: TextFieldProps) => (
  <TextField InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>} {...props} />
))(({ theme }) => ({
  '& .MuiFilledInput-root': {
    border: '1px solid lightgrey',
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: 'white',
    transition: theme.transitions.create(['border-color', 'background-color']),
    '& label.Mui-focused': {
      color: 'black !important',
    },
    '&:hover': {
      backgroundColor: 'white',
      borderColor: 'lightslategrey',
    },
    '&.Mui-focused': {
      backgroundColor: 'white',
      color: 'black',
      borderColor: 'slategrey',
    },
  },
}));

export default function Home() {
  const [quizId, setQuizId] = useState('');
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState<string[]>([]);
  const [answer1, setAnswer1] = useState('');
  const [answer2, setAnswer2] = useState('');
  const [answer3, setAnswer3] = useState('');
  const [answer4, setAnswer4] = useState('');
  const [correct, setCorrect] = useState('');
  const { data: quizData, mutate } = useGetQuizData();

  const saveNewQuestion = useCallback(async () => {
    
    try {
      const response = await axios.post('/api/saveQuestions', {
        quizId: quizId,
        question: question,
        answers: answers,
        correct: correct,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    setQuestion('');
    setAnswers([]);
    setAnswer1('');
    setAnswer2('');
    setAnswer3('');
    setAnswer4('');
    setCorrect('');
  }, [answers, correct, question, quizId]);
  
  useEffect(()=>{
    setAnswers([answer1, answer2, answer3, answer4]);
  },[answer1, answer2, answer3, answer4])
  return (
    <section>
      <div className='absolute mt-10 bg-opacity-20 lg:bg-opacity-100 md:bg-opacity-100 backdrop-blur-sm bg-[#49acaf] shadow-md rounded-md  w-screen h-screen flex flex-col items-center justify-center p-4'>
        <p className='self-start'></p>
        <Form className='flex flex-col gap-4 w-full'>
          <InputLabel id='leaderboard-select' className='text-xl font-bold'>
            Quiz Id
          </InputLabel>
          <Select
            className='text-white text-2xl'
            labelId='leaderboard-select'
            id='leaderboard-selecter'
            value={quizId}
            label='Quiz'
            onChange={(e: any) => {
              setQuizId(e.target.value);
            }}
          >
            {quizData?.map((quiz: { id: string; title: string }) => {
              return (
                <MenuItem key={quiz.id} value={quiz.id}>
                  {quiz.title}
                </MenuItem>
              );
            })}
          </Select>
          <TextFieldDL
            fullWidth
            label='Question'
            onChange={(e: any) => {
              setQuestion(e.target.value);
            }}
            id='question'
            type='text'
            value={question}
            variant='filled'
            // helperText="Some important text"
          />

          <TextFieldDL
            fullWidth
            label='Correct Answer'
            onChange={(e: any) => {
              setCorrect(e.target.value);
            }}
            id='answer'
            type='text'
            value={correct}
            variant='filled'
            // helperText="Some important text"
          />
          <TextFieldDL
            fullWidth
            label='Answer 1'
            onChange={(e: any) => {
              setAnswer1(e.target.value);
            }}
            id='answer'
            type='text'
            value={answer1}
            variant='filled'
            // helperText="Some important text"
          />
          <TextFieldDL
            fullWidth
            label='Answer 2'
            onChange={(e: any) => {
              setAnswer2(e.target.value);
            }}
            id='answer'
            type='text'
            value={answer2}
            variant='filled'
            // helperText="Some important text"
          />
          <TextFieldDL
            fullWidth
            label='Answer 3'
            onChange={(e: any) => {
              setAnswer3(e.target.value);
            }}
            id='answer'
            type='text'
            value={answer3}
            variant='filled'
            // helperText="Some important text"
          />
          <TextFieldDL
            fullWidth
            label='Answer 4'
            onChange={(e: any) => {
              setAnswer4(e.target.value);
            }}
            id='answer'
            type='text'
            value={answer4}
            variant='filled'
            // helperText="Some important text"
          />
        </Form>
        <LoadingButton
          className={`relative -bottom-3 mb-3 font-semibold transition hover:-translate-x-2 transform text-white hover:bg-transparent mr-2`}
          onClick={saveNewQuestion}
          endIcon={<BiLogInCircle />}
          loadingIndicator={<CircularProgress color='primary' size={16} />}
          loadingPosition='end'
        ></LoadingButton>
      </div>
    </section>
  );
}
