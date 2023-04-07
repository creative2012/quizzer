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
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import TopThreeQuiz from '@/components/leaderBoard/TopThreeQuiz';
import TopThree from '@/components/leaderBoard/TopThree';

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
  const [leaders, setLeaders] = useState([{ name: '' }, { name: '' }, { name: '' }]);
  const { data: quizHighScores, isLoading, mutate } = useHighscores(quiz);
  const [quizLeaders, setQuizLeaders] = useState([{ name: '' }, { name: '' }, { name: '' }]);
  // Call this function whenever you want to
  // refresh props!
  useEffect(() => {
    setQuizLeaders(quizHighScores?.scores?.slice(0, 3));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizHighScores]);
  const handleChange = (event: SelectChangeEvent) => {
    setQuiz(event.target.value as string);
  };
  useEffect(() => {
    mutate();
    setQuizLeaders(quizHighScores?.scores?.slice(0, 3));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quiz]);

  useEffect(() => {
    mutateLb();
    setLeaders(leaderboard?.users.slice(0, 3));
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
            <TopThree data={leaders} />
            <div className='max-h-[500px] custScroll-y py-4 overflow-y-auto'>
              {leaderboard?.users.map((user: { name: string; totalScore: string }, index: number) => {
                return (
                  <div
                    key={user.name}
                    className='text-zinc-700 bg-zinc-100 py-2 px-4 rounded-xl shadow-md flex flex-row mb-4  gap-4  items-center'
                  >
                    <div className='font-semibold'>{index + 1}.</div>
                    <div className='self-start flex flex-row col-span-3  gap-2 items-center w-full'>
                      <Avatar
                        className='text-xs border-2 border-white border-solid'
                        sx={{ bgcolor: deepOrange[500], width: 36, height: 36 }}
                      >
                        {user.name.charAt(0)}
                      </Avatar>
                      {user.name}
                      <div className='text-right w-full'>{user.totalScore}</div>
                    </div>
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
            <TopThreeQuiz data={quizLeaders} />
            <div className='max-h-[500px] custScroll-y py-4 overflow-y-auto'>
              {isLoading && (
                <div className='text-white flex flex-col items-center justify-center gap-4 h-full w-full'>
                  <CircularProgress color='warning' size={34} />
                  Loading...
                </div>
              )}
              {quizHighScores?.scores?.map((score: { user: { name: string }; highScore: number }, index: number) => {
                return (
                  <div
                    key={score.user.name}
                    className='text-zinc-700 bg-zinc-100 py-2 px-4 rounded-xl shadow-md flex flex-row mb-4  gap-4  items-center'
                  >
                    <div className='font-semibold w-5'>{index + 1}.</div>
                    <div className='self-start flex flex-row col-span-3  gap-2 items-center w-full'>
                      <Avatar
                        className='text-xs border-2 border-white border-solid'
                        sx={{ bgcolor: deepOrange[500], width: 36, height: 36 }}
                      >
                        {score.user.name.charAt(0)}
                      </Avatar>
                      {score.user.name}
                      <div className='text-right w-full'>{score.highScore}</div>
                    </div>
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
