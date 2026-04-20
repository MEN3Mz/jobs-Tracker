import { Link, useSearchParams } from 'react-router-dom';
import { Logo } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';

const UnverifiedAccount = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');

  return (
    <Wrapper className='full-page'>
      <div className='form'>
        <Logo />
        <h3>check your email</h3>
        <p>
          Your account has been created, but it is not verified yet. We sent a
          verification link to:
        </p>
        <p>
          <strong>{email || 'your university email'}</strong>
        </p>
        <p>
          Please open that email and click the verification link before trying
          to log in.
        </p>
        <Link to='/register' className='btn btn-block'>
          back to login
        </Link>
      </div>
    </Wrapper>
  );
};

export default UnverifiedAccount;
