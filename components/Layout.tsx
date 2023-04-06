import useCurrentUser from '@/hooks/useCurrentUser';
import NavButton from './NavButton';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  

  const animate = {
    opacity: 1,
    y: 0,
  };
  const exit = {
    opacity: 1,
    y: 0,
  };
  const animatef = {
    opacity: 1,
    x: 0,
  };
  const exitf = {
    opacity: 1,
    x: 0,
  };
  const transition = {
    delay: 0, duration: 0.7, ease: 'easeInOut' 
  }

  if (router.pathname === '/startQuiz/[quizId]') {
    exit.opacity = 0;
    exit.y = -150;
    animate.y = -150;
    exitf.x = 3000;
    animatef.x = 3000;
    animate.opacity = 1;
    transition.delay = 0.7;
  }

  if (router.pathname === '/auth') {
    return (
      <>
      {children}
      </>
    )
  }

  return (
    <div className='text-zinc-700 Main min-h-screen'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={animate}
        exit={exit}
        transition={transition}
      >
        <header
          className={` ${
            router.pathname === '/auth' && 'hidden'
          } whitespace-nowrap z-40 bg-zinc-800 text-white shadow-md bg-opacity-0 backdrop-blur-sm w-screen fixed top-0 left-0 pt-8 pl-4 pr-8 pb-8 lg:pr-12 lg:pl-8 md:pr-12 md:pl-8`}
        >
          <nav className='flex flex-row justify-between items-center Bebas text-7xl z-10'>
            {'{ QUIZZER. }'}
            <NavButton />
          </nav>
        </header>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
      <div className='h-[60px]'></div>
      <motion.div
        initial={{ x:0, opacity: 0 }}
        animate={animatef}
        exit={exitf}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
        className={`${
          router.pathname === '/auth' && 'hidden'
        } bg-zinc-800 Bebas text-zinc-800 bg-opacity-0 backdrop-blur-sm w-screen text-right  text-xl fixed bottom-0 pl-8 pr-8 pb-4 pt-4 left-0  Poppins md:text-md lg:text-md z-10`}
      >
        
          <p > &copy; Quizzer 2023 </p>
        
      </motion.div>
    </div>
  );
};

export default Layout;
