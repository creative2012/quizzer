import React from 'react'
import { motion } from 'framer-motion'

interface HelloProps {
  delay: number;
}
const Hello: React.FC<HelloProps> = ({ delay }) => {
  return (
    <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ opacity: 0, transition:{
            delay: 0,
          duration: 0.5,
          ease: "easeInOut",
          type: "spring",
          stiffness: 260,
          damping: 20,
        } }}
        transition={{
          delay: delay,
          duration: 0.5,
          ease: "easeInOut",
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className="text-4xl absolute flex gap-4 flex-col items-center top-[15%]"
      >
        <div key="hello" className="Pacifico text-pink-500 text-5xl">Hello </div>
        {"Paul"}
      </motion.div>
  )
}

export default Hello;
