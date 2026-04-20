import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterPage';
import { Logo } from '../components';
import customFetch from '../utils/axios';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    const verifyAccount = async () => {
      const email = searchParams.get('email');
      const verificationToken = searchParams.get('token');

      if (!email || !verificationToken) {
        setStatus('error');
        setMessage('Verification link is invalid or incomplete.');
        return;
      }

      try {
        const { data } = await customFetch.post('/auth/verify-email', {
          email,
          verificationToken,
        });
        setStatus('success');
        setMessage(data.msg || 'Email verified successfully.');
      } catch (error) {
        setStatus('error');
        setMessage(
          error?.response?.data?.msg || 'Unable to verify your email.'
        );
      }
    };

    verifyAccount();
  }, [searchParams]);

  return (
    <Wrapper className='full-page'>
      <div className='form'>
        <Logo />
        <h3>{status === 'loading' ? 'verifying...' : 'email verification'}</h3>
        <p>{message}</p>
        {status !== 'loading' && (
          <Link to='/register' className='btn btn-block'>
            go to login
          </Link>
        )}
      </div>
    </Wrapper>
  );
};

export default VerifyEmail;
