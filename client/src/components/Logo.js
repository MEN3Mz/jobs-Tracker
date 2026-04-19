import logo from '../assets/images/jobzy-logo-transparent.png';

const Logo = ({ variant = 'default' }) => {
  return <img src={logo} alt='jobzy logo' className={`logo logo-${variant}`} />;
};
export default Logo;
