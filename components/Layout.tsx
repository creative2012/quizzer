import useCurrentUser from '@/hooks/useCurrentUser';
import NavButton from './NavButton';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { data } = useCurrentUser();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
      className=' text-zinc-700 Main min-h-screen'
    >
      <header className='whitespace-nowrap z-50 bg-zinc-800 text-white shadow-md bg-opacity-0 backdrop-blur-sm w-screen fixed top-0 left-0 pt-8 pl-4 pr-8 pb-8 lg:pr-12 lg:pl-8 md:pr-12 md:pl-8 '>
        <nav className='flex flex-row justify-between items-center Bebas text-7xl z-10'>
          {'{ QUIZZER. }'}
          <NavButton data={data} />
        </nav>
      </header>
      {children}
      <footer className='bg-zinc-800 Bebas text-zinc-800 bg-opacity-0 backdrop-blur-sm w-screen text-right  text-xl fixed bottom-0 pl-8 pr-8 pb-4 pt-4 left-0  Poppins md:text-md lg:text-md z-10'>
        <p> &copy; Quizzer 2023 </p>
      </footer>
    </motion.div>
  );
};

export default Layout;
