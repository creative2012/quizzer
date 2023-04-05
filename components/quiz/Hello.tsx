import React from 'react'
import { motion } from 'framer-motion'

interface HelloProps {
  user:Record<string, any>;
}
const Hello: React.FC<HelloProps> = ({ user }) => {
  return (
    <div className='text-3xl flex flex-col items-center row-span-1 justify-center text-center z-10 bg-[#49acaf]'>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: -50,
              transition: { delay: 0, duration: 0.2, ease: 'easeInOut' },
            }}
            transition={{
              delay: 0.8,
              duration: 0.2,
              ease: 'easeInOut',
              type: 'spring',
              stiffness: 100,
            }}
            className='flex flex-col gap-4 text-white'
          >
            <span className='Pacifico text-7xl'>Hello </span>
            <div className='flex flex-row items-center justify-center gap-4 font-semibold'>
              <div>{user?.name}</div>
            </div>
          </motion.div>
        </div>
  )
}

export default Hello;
