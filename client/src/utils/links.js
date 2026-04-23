import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms, FaPlusSquare } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { BsGlobe2 } from 'react-icons/bs';

const getLinks = (role) => {
  const links = [
    { id: 1, text: 'stats', path: '/', icon: <IoBarChartSharp /> },
    { id: 2, text: 'my jobs', path: 'all-jobs', icon: <MdQueryStats /> },
    {
      id: 3,
      text: 'opportunities',
      path: 'opportunities',
      icon: <BsGlobe2 />,
    },
    { id: 4, text: 'add job', path: 'add-job', icon: <FaWpforms /> },
    { id: 5, text: 'profile', path: 'profile', icon: <ImProfile /> },
  ];

  if (role === 'admin') {
    links.splice(4, 0, {
      id: 6,
      text: 'create opportunity',
      path: 'create-opportunity',
      icon: <FaPlusSquare />,
    });
  }

  return links;
};

export default getLinks;
