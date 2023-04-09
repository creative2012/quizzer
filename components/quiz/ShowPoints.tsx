import { GiLaurelsTrophy } from 'react-icons/gi';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { CircularProgress } from '@mui/material';
import { useState } from 'react';

interface CountdownTimerProps {
  data: Record<string, any>;
  points: number | undefined;
  medal: string;
  isGameOver: boolean;
  onClick: () => void;
}

const ShowPoints: React.FC<CountdownTimerProps> = ({ data, points, medal, isGameOver, onClick }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const exit = () => {
    router.push('/');
    setIsLoading(true);
  };
  if (isGameOver) {
    return (
      <AnimatePresence mode='wait'>
        <motion.div
          key={data?.title}
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{
            opacity: 0,
            y: -30,
            transition: { delay: 0, duration: 0.2, ease: 'easeInOut' },
          }}
          transition={{
            delay: 2,
            duration: 0.5,
            ease: 'easeInOut',
            type: 'spring',
            stiffness: 100,
          }}
        >
          <div key='1' className='flex flex-col gap-4'>
            <p key='2' className='text-center text-4xl Bebas'>
              You got
            </p>
            <p key='3' className='text-center'>
              {points} out of {data?.question.length - 1} questions correct
            </p>
            {medal !== 'white' && (
              <motion.div
                key='trophy'
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{
                  opacity: 0,
                  y: 50,
                  transition: { delay: 0, duration: 0.2, ease: 'easeInOut' },
                }}
                transition={{
                  delay: 3,
                  duration: 0.5,
                  ease: 'easeInOut',
                  type: 'spring',
                  stiffness: 100,
                }}
                className='self-center'
              >
                <GiLaurelsTrophy key='trophy2' color={medal} size={70} />
              </motion.div>
            )}
            <motion.div
              key='options'
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{
                opacity: 0,
                y: 50,
                transition: { delay: 0, duration: 0.2, ease: 'easeInOut' },
              }}
              transition={{
                delay: 4,
                duration: 0.5,
                ease: 'easeInOut',
                type: 'spring',
                stiffness: 100,
              }}
              className='flex flex-row gap-4'
            >
              <Button
                onClick={onClick}
                disabled={false}
                className='text-zinc-800 bg-white text-lg font-semibold hover:text-white hover:scale-110 transition transform'
                variant='contained'
              >
                Review
              </Button>
              <Button
                onClick={exit}
                disabled={false}
                className='text-zinc-800 bg-white text-lg font-semibold hover:text-white hover:scale-110 transition transform'
                variant='contained'
              >
                {isLoading ? <CircularProgress thickness={7} color='inherit' size={24} /> : 'exit'}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  } else return null;
};
export default ShowPoints;
