import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import getLinks from '../utils/links';

const NavLinks = ({ toggleSidebar }) => {
  const { user } = useSelector((store) => store.user);
  const links = getLinks(user?.role);

  return (
    <div className='nav-links'>
      {links.map((link) => {
        const { text, path, id, icon } = link;
        return (
          <NavLink
            to={path}
            className={({ isActive }) => {
              return isActive ? 'nav-link active' : 'nav-link';
            }}
            key={id}
            onClick={toggleSidebar}
          >
            <span className='icon'>{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};
export default NavLinks;
