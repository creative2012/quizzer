import React from 'react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
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
  const [quiz, setQuiz] = React.useState('2');
  const { data } = useHighscores(quiz);
  console.log(data);
  const handleChange = (event: SelectChangeEvent) => {
    setQuiz(event.target.value as string);
  };
  return (
    <section>
      <div className={`h-[150px]`}></div>
      <div className='ml-8 mr-8 mt-4'>
        <div>
          <Box sx={{ minWidth: 120 }}>
            <FormControl variant="standard" fullWidth>
              <InputLabel id='leaderboard-select' className="text-xl font-bold">Quiz</InputLabel>
              <Select
              className="text-white text-2xl"
                labelId='leaderboard-select'
                id='leaderboard-selecter'
                value={quiz}
                label='Quiz'
                onChange={handleChange}
              >
                <MenuItem value={1}>Javascript</MenuItem>
                <MenuItem value={2}>all</MenuItem>
                <MenuItem value={3}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
      </div>
    </section>
  );
}
