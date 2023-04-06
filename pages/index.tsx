import QuizList from '@/components/QuizList';
import React from 'react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import useQuizList from '@/hooks/useQuizList';
import Layout from '@/components/Layout';

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

  return (
      <section>
        <div className={`h-[150px]`}></div>
        <QuizList title={'Languages'} data={languages} loading={isLang} />
        <QuizList title={'Librarys'} data={librarys} loading={isFrame} />
        <QuizList title={'Frameworks'} data={frameworks} loading={isLib} />
        <QuizList title={'Databases'} data={databases} loading={isDB} />
        <QuizList title={'Runtime Environments'} data={runtime} loading={isRun} />
      </section>
  );
}
