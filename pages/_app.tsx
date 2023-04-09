import '@/styles/globals.css'
import type { AppProps } from 'next/app';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import Layout from '@/components/Layout';
import NextNProgress from 'nextjs-progressbar';

export default function App({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
            const loader = document.getElementById('globalLoader');
        if (loader)
            loader.style.display = 'none';
    }
}, []);
  return (
    <>
    <NextNProgress color="white" />
    <Layout>
    <AnimatePresence mode="wait" initial={false}>
      <Component {...pageProps} key={router.asPath} />
    </AnimatePresence>
    </Layout>
    </>
  )
}
