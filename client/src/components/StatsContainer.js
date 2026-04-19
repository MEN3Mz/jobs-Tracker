import StatItem from './StatItem';
import {
  FaCalendarCheck,
  FaClipboardCheck,
  FaHourglassHalf,
  FaSuitcaseRolling,
  FaTimesCircle,
} from 'react-icons/fa';
import Wrapper from '../assets/wrappers/StatsContainer';
import { useSelector } from 'react-redux';

const StatsContainer = () => {
  const { stats } = useSelector((store) => store.allJobs);

  const defaultStats = [
    {
      title: "didn't apply yet",
      count: stats.didntYet || 0,
      icon: <FaHourglassHalf />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: 'submitted',
      count: stats.submitted || 0,
      icon: <FaSuitcaseRolling />,
      color: '#3b82f6',
      bcg: '#dbeafe',
    },
    {
      title: 'interviews scheduled',
      count: stats.interview || 0,
      icon: <FaCalendarCheck />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'accepted',
      count: stats.accepted || 0,
      icon: <FaClipboardCheck />,
      color: '#0f5132',
      bcg: '#d1e7dd',
    },
    {
      title: 'rejected',
      count: stats.rejected || 0,
      icon: <FaTimesCircle />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
  ];

  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatItem key={index} {...item} />;
      })}
    </Wrapper>
  );
};
export default StatsContainer;
