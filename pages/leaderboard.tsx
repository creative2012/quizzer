import React, { useState, useEffect } from 'react';
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
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';

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
  const { data: leaderboard, mutate: mutateLb } = useLeaderboard();
  const { data: quizHighScores, isLoading, mutate } = useHighscores(quiz);
  const router = useRouter();
  // Call this function whenever you want to
  // refresh props!

  const handleChange = (event: SelectChangeEvent) => {
    setQuiz(event.target.value as string);
  };
  useEffect(() => {
    mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quiz]);

  useEffect(() => {
    mutateLb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leaderboard]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <section>
        <div className={`h-[150px]`}></div>
        <div className='ml-8 mr-8 mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 md:gap-8 lg:gap-8'>
          <div>
            <div className='h-[59.5px] flex items-center justify-center text-white gap-4 text-2xl'>
              Leaderboard <span className='text-xs'>All quizzes</span>
            </div>
            <div className='bg-white h-[500px] custScroll-y p-4 rounded-2xl overflow-y-auto'>
              <div className='text-[#ff5722] mb-4 grid grid-cols-5 font-bold gap-4 justify-between items-center'>
                <div className='font-semibold'>POS</div>
                <div className='flex flex-row col-span-3  gap-2 items-center'>NAME</div>
                <div className='text-right'>SCORE</div>
              </div>
              {leaderboard?.users.map((user: { name: string; totalScore: string }, index: number) => {
                return (
                  <div key={user.name} className='text-zinc-700 mb-4 grid grid-cols-5 gap-4 justify-between items-center'>
                    <div className='font-semibold'>{index + 1}.</div>
                    <div className='flex flex-row col-span-3  gap-2 items-center'>
                      <Avatar
                        className='text-xs border-2 border-white border-solid'
                        sx={{ bgcolor: deepOrange[500], width: 36, height: 36 }}
                      >
                        {user.name.charAt(0)}
                      </Avatar>
                      {user.name}
                    </div>
                    <div className='text-right'>{user.totalScore}</div>
                  </div>
                );
              })}
            </div>
          </div>
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
                  <MenuItem value={'PHP'}>PHP</MenuItem>
                  <MenuItem value={'Python'}>Python</MenuItem>
                  <MenuItem value={'Prisma'}>Prisma</MenuItem>
                  <MenuItem value={'React.js'}>React</MenuItem>
                  <MenuItem value={'Vue.js'}>Vue</MenuItem>
                  <MenuItem value={'jQuery'}>jQuery</MenuItem>
                  <MenuItem value={'Laravel'}>Laravel</MenuItem>
                  <MenuItem value={'Next.js'}>Next</MenuItem>
                  <MenuItem value={'MongoDB'}>MongoDB</MenuItem>
                  <MenuItem value={'Node.js'}>Node</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <div className='bg-white h-[500px] custScroll-y p-4 rounded-2xl overflow-y-auto'>
              {isLoading && (
                <div className='text-white flex flex-col items-center justify-center gap-4 h-full w-full'>
                  <CircularProgress color='warning' size={34} />
                  Loading...
                </div>
              )}
              <div className='text-[#ff5722] mb-4 grid grid-cols-5 font-bold gap-4 justify-between items-center'>
                <div className='font-semibold'>POS</div>
                <div className='flex flex-row col-span-3  gap-2 items-center'>NAME</div>
                <div className='text-right'>SCORE</div>
              </div>
              {quizHighScores?.scores?.map((score: { user: { name: string }; highScore: number }, index: number) => {
                return (
                  <div
                    key={score.user.name}
                    className='text-zinc-700 grid grid-cols-5 mb-4  gap-4 justify-between items-center'
                  >
                    <div className='font-semibold'>{index + 1}.</div>
                    <div className='flex flex-row col-span-3  gap-2 items-center'>
                      <Avatar
                        className='text-xs border-2 border-white border-solid '
                        sx={{ bgcolor: deepOrange[500], width: 36, height: 36 }}
                      >
                        {score.user.name.charAt(0)}
                      </Avatar>
                      {score.user.name}
                    </div>
                    <div className='text-right'>{score.highScore}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
