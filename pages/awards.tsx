import React from 'react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
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
export default function Awards() {


  return (
      <section>
      <div className={`h-[150px]`}></div>
        <h1>Awards</h1>
      </section>
  );
}
