import { GiLaurelsTrophy } from 'react-icons/gi';
import { AnimatePresence, motion } from 'framer-motion';

interface CountdownTimerProps {
  data: Record<string, any>;
  points: number | undefined;
  medal: string;
  isGameOver: boolean;
}

const ShowPoints: React.FC<CountdownTimerProps> = ({ data, points, medal, isGameOver }) => {
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
                <GiLaurelsTrophy key='trophy2' color={medal} size={50} />
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    );
  } else return null;
};
export default ShowPoints;
