import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import { Divider } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import { signOut } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useCurrentUser from '@/hooks/useCurrentUser';

const NavButton = () => {
  const router = useRouter();
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
      <div className='text-2xl flex flex-row items-center gap-4 text-zinc-800'>
        <Link href='/' className={`${(router.pathname === "/" || router.pathname === "/startQuiz/[quizId]") && "text-white"} hover:scale-110 transition transform cursor-pointer hidden md:block lg:block focus:text-white `}>Quizzes</Link>
        {/* <Link href='/awards' className={`${router.pathname === "/awards" && "text-white"} hover:scale-110 transition transform cursor-pointer hidden md:block lg:block focus:text-white `}>Awards</Link> */}
        <Link href='/leaderboard' className={`${router.pathname === "/leaderboard" && "text-white"} hover:scale-110 transition transform cursor-pointer hidden md:block lg:block focus:text-white `}>LeaderBoard</Link>
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
          <MenuItem onClick={()=>{router.push('/')}}>
            <ListItemIcon>
              <QuizOutlinedIcon fontSize='small' />
            </ListItemIcon>
            <div className={`${router.pathname === "/" && "text-orange-500"}`}>Quizzes</div>
          </MenuItem>
          {/* <MenuItem onClick={()=>{router.push('/awards')}}>
            <ListItemIcon>
              <EmojiEventsOutlinedIcon fontSize='small' />
            </ListItemIcon>
            <div className={`${router.pathname === "/awards" && "text-orange-500"}`}>Awards</div>
          </MenuItem> */}
          <MenuItem onClick={()=>{router.push('/leaderboard')}}>
            <ListItemIcon>
              <LeaderboardOutlinedIcon fontSize='small' />
            </ListItemIcon>
            <div className={`${router.pathname === "/leaderboard" && "text-orange-500"}`}>Leaderboard</div>
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
    </>
  );
};

export default NavButton;
