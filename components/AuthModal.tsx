import React, { forwardRef, Ref, useState, useEffect } from 'react';
import { BiLogInCircle } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';
import TextFieldDL from './landingPage/TextFieldDL';
import LoadingButton from '@mui/lab/LoadingButton';
import { CircularProgress } from '@mui/material';
import { FormControl as Form } from '@mui/material';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

interface AuthModalProps {
  onClick: () => void;
  title: string;
  show?: boolean;
}

// eslint-disable-next-line react/display-name
const AuthModal = forwardRef<HTMLButtonElement, AuthModalProps>((props, ref: Ref<HTMLButtonElement>) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
    !isModalOpen && props.onClick();
  };
  const login = () => {
    setLoading(true);
  };
  //open modal immediatly
  useEffect(() => {
    props.show && setIsModalOpen(true);
  }, [props.show]);

  return (
    <>
      <button ref={ref} onClick={handleModal} className='hidden'></button>

      <Dialog open={isModalOpen} onClose={handleModal} className='backdrop-blur-sm'>
        <DialogTitle className='Pacifico'>{props.title}</DialogTitle>
        <DialogContent>
          <button
            onClick={handleModal}
            className='absolute top-4 right-4  items-center text-2xl transition  text--zinc-900 hover:text-zinc-500 '
          >
            <MdClose />
          </button>
          <Form className='flex flex-col gap-4 w-full'>
            <TextFieldDL
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              id='email'
              label='Email'
              type='email'
              autoComplete='current-email'
              variant='filled'
              // helperText="Some important text"
            />
            <TextFieldDL
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              id='password'
              label='Password'
              type='password'
              autoComplete='current-password'
              variant='filled'
              // helperText="Some important text"
            />
          </Form>
        </DialogContent>
        <DialogActions className=' h-[50px] relative w-full flex items-center justify-end p-4 bg-[#f25771] lg:w-[350px] md:w-[350px] transition'>
          <LoadingButton
            className={`font-semibold transition hover:-translate-x-2 transform text-white hover:bg-transparent mr-2 ${
              loading && 'duration-1000 bg-transparent shadow-sm'
            }`}
            onClick={login}
            loading={loading}
            endIcon={<BiLogInCircle />}
            loadingIndicator={<CircularProgress color='primary' size={16} />}
            loadingPosition='end'
          >
            <span>{loading ? 'Logging in...' : 'Login'}</span>
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
});

export default AuthModal;
