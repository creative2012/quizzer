import '@/styles/globals.css'
import type { AppProps } from 'next/app';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

export default function App({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
            const loader = document.getElementById('globalLoader');
        if (loader)
            loader.style.display = 'none';
    }
}, []);
  return (
    <AnimatePresence mode="wait" initial={true}>
      <Component {...pageProps} key={router.asPath} />
    </AnimatePresence>
  )
}
