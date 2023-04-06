import React, { useState, useEffect, useCallback } from 'react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import useLeaderboard from '@/hooks/useLeaderboard';
import { CircularProgress } from '@mui/material';
import useHighscores from '@/hooks/useHighscores';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
export default function Leaderboard() {
  const [quiz, setQuiz] = useState('Javascript');
  const { data: leaderboard } = useLeaderboard();
  const { data: quizHighScores, isLoading } = useHighscores(quiz);

  const handleChange = (event: SelectChangeEvent) => {
    setQuiz(event.target.value as string);
  };
  return (
    <section>
      <div className={`h-[150px]`}></div>
      <div className='ml-8 mr-8 mt-4 grid grid-cols-2 gap-4 h-[59.5px]'>
        <div>
          <Box sx={{ minWidth: 120 }}>
            <FormControl variant='standard' fullWidth>
              <InputLabel id='leaderboard-select' className='text-xl font-bold'>
                Quiz
              </InputLabel>
              <Select
                className='text-white text-2xl'
                labelId='leaderboard-select'
                id='leaderboard-selecter'
                value={quiz}
                label='Quiz'
                onChange={handleChange}
              >
                <MenuItem value={'Javascript'}>Javascript</MenuItem>
                <MenuItem value={'Javascript ES6'}>Javascript ES6</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <div className='bg-white h-[500px] p-4'>
            {isLoading && (
              <div className='text-white flex flex-col items-center justify-center gap-4 h-full w-full'>
                <CircularProgress color='warning' size={34} />
                Loading...
              </div>
            )}
            {quizHighScores?.scores?.map((score: { user: { name: string }; highScore: number }) => {
              return (
                <div key={score.user.name} className='flex flex-row gap-4 justify-between'>
                  {score.user.name}
                  <div>{score.highScore}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <div className='h-[59.5px] flex items-center justify-center'>Total High scores per user</div>
          <div className='bg-white h-[500px] p-4'>
            {leaderboard?.users.map((user: { name: string; totalScore: string }) => {
              return (
                <div key={user.name} className='flex flex-row gap-4 justify-between'>
                  {user.name}
                  <div>{user.totalScore}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
