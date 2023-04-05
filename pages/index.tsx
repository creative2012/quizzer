import QuizList from '@/components/QuizList';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { Divider } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import { NextPageContext } from 'next';
import { signOut } from 'next-auth/react';
import { getSession } from 'next-auth/react';
import useCurrentUser from '@/hooks/useCurrentUser';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import useQuizList from '@/hooks/useQuizList';

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
          <div className='text-2xl flex flex-row items-center gap-4 text-zinc-800'>
            <div className='hover:scale-110 transition transform cursor-pointer text-white hidden md:block lg:block'>
              Quizzes
            </div>
            <div className='hover:scale-110 transition transform cursor-pointer hidden md:block lg:block'>Awards</div>
            <div className='hover:scale-110 transition transform cursor-pointer hidden md:block lg:block'>
              LeaderBoard
            </div>
            <IconButton
              onClick={handleClick}
              size='small'
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar
                className=' cursor-pointer border-2 border-white border-solid hover:border-4'
                sx={{ bgcolor: deepOrange[500], width: 56, height: 56 }}
              >
                {data?.name.charAt(0)}
              </Avatar>
            </IconButton>
          </div>
          <Menu
            anchorEl={anchorEl}
            id='account-menu'
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <div className='block md:hidden lg:hidden'>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <QuizOutlinedIcon fontSize='small' />
                </ListItemIcon>
                Quizzes
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <EmojiEventsOutlinedIcon fontSize='small' />
                </ListItemIcon>
                Awards
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <LeaderboardOutlinedIcon fontSize='small' />
                </ListItemIcon>
                LeaderBoard
              </MenuItem>
              <Divider />
            </div>

            <MenuItem onClick={() => signOut()}>
              <ListItemIcon>
                <Logout fontSize='small' />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
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
