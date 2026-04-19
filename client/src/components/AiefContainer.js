import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Wrapper from '../assets/wrappers/JobsContainer';
import { getAiefFilters, getAllAief } from '../features/aief/aiefSlice';
import Loading from './Loading';
import AiefOpportunity from './AiefOpportunity';
import AiefPageBtnContainer from './AiefPageBtnContainer';

const SEARCH_DELAY_MS = 1200;

const AiefContainer = () => {
  const {
    opportunities,
    isLoading,
    currentPage,
    totalJobs,
    numOfPages,
    major,
    workType,
    location,
    compensation,
    targetGroup,
    sort,
    deadline,
    industry,
  } = useSelector((store) => store.aief);

  const dispatch = useDispatch();
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      dispatch(getAiefFilters());
      dispatch(getAllAief());
      return;
    }

    const timeoutId = setTimeout(() => {
      dispatch(getAllAief());
    }, SEARCH_DELAY_MS);

    return () => clearTimeout(timeoutId);
  }, [
    dispatch,
    currentPage,
    major,
    workType,
    location,
    compensation,
    targetGroup,
    sort,
    deadline,
    industry,
  ]);

  if (isLoading) {
    return <Loading center />;
  }

  if (opportunities.length === 0) {
    return (
      <Wrapper>
        <h2>No AIEF opportunities match these filters yet.</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} opportunit{totalJobs === 1 ? 'y' : 'ies'} found
      </h5>
      <div className='jobs'>
        {opportunities.map((opportunity) => {
          return <AiefOpportunity key={opportunity._id} {...opportunity} />;
        })}
      </div>
      {numOfPages > 1 && <AiefPageBtnContainer />}
    </Wrapper>
  );
};

export default AiefContainer;
