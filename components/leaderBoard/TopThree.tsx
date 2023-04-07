import { GiLaurelsTrophy } from 'react-icons/gi';
import { AnimatePresence, motion } from 'framer-motion';

interface CountdownTimerProps {
  data: Record<string, any>;

}

const TopThree: React.FC<CountdownTimerProps> = ({ data }) => {
 
    return (
      <AnimatePresence mode='wait'>
        <div className='h-[200px] gap-4 flex justify-center bg-zinc-100 rounded-xl'>
              <div className='h-[#ff8a65] text-zinc-800 w-[300px] grid grid-cols-3  items-end gap-4 rounded-xl'>
              <div className='bg-[#ff8a65] text-white font-semibold flex flex-col items-center h-[30%]'>
                  <div className='flex flex-col justify-center items-center gap-2 relative -top-20'>
                    <GiLaurelsTrophy color={'#CD7F32'} size={80} />
                    {data?.length >= 3 && data[2]?.name}
                  </div>
                </div>
                <div className='bg-[#ff5722] text-white font-semibold flex flex-col items-center h-[48%]'>
                  <div className='flex flex-col justify-center items-center gap-2 relative -top-20'>
                    <GiLaurelsTrophy color={'gold'} size={80} />
                    {data?.length >= 1 && data[0]?.name}
                  </div>
                  
                </div>
                <div className='bg-[#ff7043] text-white font-semibold pb-9 flex flex-col items-center justify-center h-[40%]'>
                  <div className='flex flex-col justify-center items-center gap-2 relative -top-12'>
                    <GiLaurelsTrophy color={'silver'} size={80} />
                    {data?.length >= 2 && data[1]?.name}
                  </div>
                  
                </div>
              </div>
            </div>
      </AnimatePresence>
    );
 
};
export default TopThree;
