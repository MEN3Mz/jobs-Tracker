import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from '../components';
import { Link } from 'react-router-dom';
const Landing = () => {
  return (
    <Wrapper>
      <div className='container page'>
        {/* info */}
        <div className='info'>
          <Logo variant='landing' />
          <h1>
            track every <span>application</span> with jobzy
          </h1>
          <p>
            Keep your internship applications, AIEF opportunities, and follow-up
            progress in one place so you can apply without losing track of what
            comes next.
          </p>
          <Link to='/register' className='btn btn-hero'>
            Login/Register
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

export default Landing;
