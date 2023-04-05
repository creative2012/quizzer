import QuizList from '@/components/QuizList';
import { motion } from 'framer-motion';
import React from 'react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import useCurrentUser from '@/hooks/useCurrentUser';
import useQuizList from '@/hooks/useQuizList';
import NavButton from '@/components/NavButton';

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
export default function Home() {
  const { data: languages, isLoading: isLang } = useQuizList('Language');
  const { data: frameworks, isLoading: isFrame } = useQuizList('Framework');
  const { data: librarys, isLoading: isLib } = useQuizList('Library');
  const { data: databases, isLoading: isDB } = useQuizList('Database');
  const { data: runtime, isLoading: isRun } = useQuizList('Runtime Environment');

  const { data } = useCurrentUser();
  

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
        className=' text-zinc-700 Main min-h-screen'
      >
        <div className=' whitespace-nowrap bg-zinc-800 text-white shadow-md flex flex-row justify-between items-center bg-opacity-0 backdrop-blur-sm w-screen fixed top-0 left-0 pt-8 pl-4 pr-8 pb-8 lg:pr-12 lg:pl-8 md:pr-12 md:pl-8  Bebas text-7xl z-10'>
          {'{ QUIZZER. }'}
         <NavButton data={data}/>
        </div>

        <div className='h-[150px]'></div>
        <QuizList title={'Languages'} data={languages} loading={isLang} />
        <QuizList title={'Librarys'} data={librarys} loading={isFrame} />
        <QuizList title={'Frameworks'} data={frameworks} loading={isLib} />
        <QuizList title={'Databases'} data={databases} loading={isDB} />
        <QuizList title={'Runtime Environments'} data={runtime} loading={isRun} />
        <div className='h-[60px]'></div>
        <div className='bg-zinc-800 Bebas text-zinc-800 bg-opacity-0 backdrop-blur-sm w-screen text-right  text-xl fixed bottom-0 pl-8 pr-8 pb-4 pt-4 left-0  Poppins md:text-md lg:text-md z-10'>
          &copy; Quizzer 2023
        </div>
      </motion.div>
    </>
  );
}
