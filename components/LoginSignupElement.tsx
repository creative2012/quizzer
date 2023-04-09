import React, { useState, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { OutlinedInputProps } from '@mui/material/OutlinedInput';
import { CircularProgress, FormControl as Form } from '@mui/material';
import Alert from '@/components/Alert';
import { LoadingButton } from '@mui/lab';
import { BiLogInCircle } from 'react-icons/bi';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const TextFieldDL = styled((props: TextFieldProps) => (
  <TextField InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>} {...props} />
))(({ theme }) => ({
  '& .MuiFilledInput-root': {
    border: '1px solid lightgrey',
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: 'white',
    transition: theme.transitions.create(['border-color', 'background-color']),
    '& label.Mui-focused': {
      color: 'black !important',
    },
    '&:hover': {
      backgroundColor: 'white',
      borderColor: 'lightslategrey',
    },
    '&.Mui-focused': {
      backgroundColor: 'white',
      color: 'black',
      borderColor: 'slategrey',
    },
  },
}));

const LoginSignupElement = () => {
  const [option, setOption] = useState(true);
  const router = useRouter();
  const [name, setname] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toggleVariant = useCallback(() => {
    setOption((currentVariant) => (!currentVariant));
  }, []);

  const login = useCallback(async () => {
    try {
      setIsLoading(true);
      await signIn('credentials', {
        email,
        password,
        callbackUrl: '/',
        redirect: false,
      }).then((error) => {
        if (error?.ok) {
          router.push('/');
        } else {
          setIsLoading(false);
          handleError(error, 'login');
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password, router]);

  const register = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.post('api/register', {
        email,
        name,
        password,
      });

      login();
    } catch (error) {
      setIsLoading(false);
      handleError(error, 'signup');
    }
  }, [email, name, password, login]);

  const [open, setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleError = (e: any, t: string) => {
    let error;
    if (t === 'signup') {
      error = e.response?.data?.error;
    }
    if (t === 'login') {
      console.log(error);
      error = e.error;
    }

    setErrorMsg(error);
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <div>
      <IconButton size='small' aria-label='close' color='inherit' onClick={handleClose}>
        <CloseIcon fontSize='small' />
      </IconButton>
    </div>
  );
  return (
    <>
      <div className='bg-transparent gap-4 Bebas text-2xl text-white flex flex-col pl-8  lg:pl-52 items-center md:items-start lg:items-start justify-center fixed top-0 h-screen w-screen  z-10'>
        <div className='bg-opacity-20 lg:bg-opacity-100 md:bg-opacity-100 backdrop-blur-sm bg-[#49acaf] shadow-md rounded-md  w-[300px] flex flex-col items-center justify-start p-4'>
          <p className='self-start'>{option ? 'NEW Account' : 'Welcome Back'}</p>
          <Form className='flex flex-col gap-4 w-full'>
            {option && (
              <TextFieldDL
                fullWidth
                label='Username'
                onChange={(e: any) => {
                  setname(e.target.value);
                }}
                id='name'
                type='text'
                value={name}
                variant='filled'
                // helperText="Some important text"
              />
            )}
            <TextFieldDL
              fullWidth
              label='Email'
              onChange={(e: any) => {
                setEmail(e.target.value);
              }}
              id='email'
              type='email'
              value={email}
              variant='filled'
              // helperText="Some important text"
            />
            <TextFieldDL
              fullWidth
              label='Password'
              onChange={(e: any) => {
                setPassword(e.target.value);
              }}
              id='password'
              type='password'
              value={password}
              variant='filled'
              // helperText="Some important text"
            />
          </Form>
          <LoadingButton
            className={`relative -bottom-3 mb-3  ${
              isLoading ? 'text-center' : '-right-24'
            } font-semibold transition hover:-translate-x-2 transform text-white hover:bg-transparent mr-2`}
            onClick={option === false ? login : register}
            loading={isLoading}
            endIcon={<BiLogInCircle />}
            loadingIndicator={<CircularProgress color='primary' size={16} />}
            loadingPosition='end'
          >
            {option ? (
              <span>{isLoading ? 'Signing in...'  : 'Signup'}</span>
            ) : (
              <span>{isLoading ? 'Logining in...' : 'Login'}</span>
            )}
          </LoadingButton>

          <div className='Poppins flex flex-row gap-2 text-sm'>
            {option ? 'Already Have an account?' : 'No account?'}
            <div
              onClick={toggleVariant}
              className='font-semibold cursor-pointer transition transform hover:scale-110 underline'
            >
              {option ? 'Login' : 'Signup'}
            </div>
          </div>
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} action={action}>
        <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
          {errorMsg}
        </Alert>
      </Snackbar>
    </>
  );
};
export default LoginSignupElement;
