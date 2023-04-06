import React, { useCallback, useState } from 'react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import useLeaderboard from '@/hooks/useLeaderboard';
import axios from 'axios';
import { CircularProgress } from '@mui/material';

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
  const [quiz, setQuiz] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const { data: leaderboard } = useLeaderboard();

  console.log(leaderboard);
  const handleChange = useCallback(async (event: SelectChangeEvent) => {
    setQuiz(event.target.value as string);
    try {
      setIsLoading(true);
      const response = await axios.get(`api/highscores/${event.target.value as string}`);
      console.log(response.data);
      setIsLoading(false);
    } catch (error) {}
  }, []);

  if (isLoading) {
    return (
      <div className='text-white flex flex-col items-center justify-center gap-4 h-screen w-screen'>
        <CircularProgress color='warning' size={34} />
        Loading...
      </div>
    );
  }

  return (
    <section>
      <div className={`h-[150px]`}></div>
      <div className='ml-8 mr-8 mt-4'>
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
        </div>
      </div>
    </section>
  );
}
