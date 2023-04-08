import { GiLaurelsTrophy } from 'react-icons/gi';
import { AnimatePresence, motion } from 'framer-motion';

interface CountdownTimerProps {
  data: Record<string, any>;

}

const TopThreeQuiz: React.FC<CountdownTimerProps> = ({ data }) => {
 
    return (
      <AnimatePresence mode='wait'>
        <div className='h-[200px] gap-4 flex justify-center bg-zinc-100 rounded-xl shadow-md awardBack'>
              <div className='h-[200px] text-zinc-800 w-[300px] grid grid-cols-3  items-end gap-4 rounded-xl'>
              <div className='bg-[#ff8a65] text-white  font-semibold flex flex-col items-center h-[30%] rounded-t-md'>
                  <div className='flex flex-col justify-center items-center gap-2 relative -top-20'>
                    <GiLaurelsTrophy color={'#CD7F32'} size={80} />
                    {data?.length >= 3 ? data[2]?.user?.name : 'none'}
                    <div className="relative bottom-3 Bebas text-2xl">3rd</div>
                  </div>
                </div>
                <div className='bg-[#ff5722] text-white font-semibold flex flex-col items-center h-[48%] rounded-t-md'>
                  <div className='flex flex-col justify-center items-center gap-2 relative -top-20'>
                    <GiLaurelsTrophy color={'gold'} size={80} />
                    {data?.length >= 1 ? data[0]?.user?.name : 'none'}
                    <div className="absolute -bottom-12 Bebas text-4xl">1st</div>
                  </div>
                  
                </div>
                <div className='bg-[#ff7043] text-white font-semibold pb-9 flex flex-col items-center justify-center h-[40%] rounded-t-md'>
                  <div className='flex flex-col justify-center items-center gap-2 relative -top-12'>
                    <GiLaurelsTrophy color={'silver'} size={80} />
                    {data?.length >= 2 ? data[1]?.user?.name : 'none'}
                    <div className="absolute -bottom-10 Bebas text-2xl">2nd</div>
                  </div>
                  
                </div>
              </div>
            </div>
      </AnimatePresence>
    );
 
};
export default TopThreeQuiz;
