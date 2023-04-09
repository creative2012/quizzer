import React from 'react';
import { motion } from 'framer-motion';
import { getSession } from 'next-auth/react';
import { NextPageContext } from 'next';
import LoginSignupElement from '@/components/LoginSignupElement';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const videoOption = {
  className: 'h-[100vh] w-[100vw] object-cover cust:object-top ',
  src: '/assets/women2.mp4',
  
};

export default function Auth() {
 
  return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease: 'easeInOut' }} className=' text-zinc-700 bg-white' >
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: 0.4, duration: 0.7, ease: 'easeInOut' }} className='absolute top-0 h-full overflow-hidden' >
          <video {...videoOption} muted autoPlay loop playsInline disablePictureInPicture></video>
        </motion.div>
        <header className='bg-transparent fixed top-8 left-8 Bebas  text-7xl text-white z-10'><h1>{'{ QUIZZER. }'}</h1></header>
        <section>
          <LoginSignupElement />
        </section>
        <footer className='bg-zinc-800 bg-opacity-10 backdrop-blur-md w-screen fixed bottom-0 pl-8 pr-8 pb-4 pt-4 left-0 Poppins text-sm md:text-md lg:text-md text-white z-10'>
          <p>A selection of coding tests covering some of the most popular languages and frameworks</p>
        </footer>
      </motion.div>
  );
}
