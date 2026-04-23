import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Wrapper from '../assets/wrappers/JobsContainer';
import {
  getAiefFilters,
  getAllAief,
  getSavedOpportunityRefs,
} from '../features/aief/aiefSlice';
import Loading from './Loading';
import AiefOpportunity from './AiefOpportunity';
import AiefPageBtnContainer from './AiefPageBtnContainer';

const SEARCH_DELAY_MS = 1200;
const buildOpportunityKey = (companyName = '', internshipTitle = '') =>
  `${companyName}::${internshipTitle}`;

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
    savedOpportunityIds,
    savedOpportunityKeys,
  } = useSelector((store) => store.aief);

  const dispatch = useDispatch();
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      dispatch(getAiefFilters());
      dispatch(getSavedOpportunityRefs());
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
    savedOpportunityIds,
    savedOpportunityKeys,
  ]);

  if (isLoading) {
    return <Loading center />;
  }

  if (opportunities.length === 0) {
    return (
      <Wrapper>
        <h2>No opportunities match these filters yet.</h2>
      </Wrapper>
    );
  }

  const prioritizedOpportunities = [...opportunities].sort((first, second) => {
    const firstIsSaved =
      savedOpportunityIds.includes(first._id) ||
      savedOpportunityKeys.includes(
        buildOpportunityKey(first.companyName, first.internshipTitle)
      );
    const secondIsSaved =
      savedOpportunityIds.includes(second._id) ||
      savedOpportunityKeys.includes(
        buildOpportunityKey(second.companyName, second.internshipTitle)
      );

    if (firstIsSaved === secondIsSaved) return 0;

    return firstIsSaved ? 1 : -1;
  });

  return (
    <Wrapper>
      <h5>
        {totalJobs} opportunit{totalJobs === 1 ? 'y' : 'ies'} found
      </h5>
      <div className='jobs'>
        {prioritizedOpportunities.map((opportunity) => {
          return <AiefOpportunity key={opportunity._id} {...opportunity} />;
        })}
      </div>
      {numOfPages > 1 && <AiefPageBtnContainer />}
    </Wrapper>
  );
};

export default AiefContainer;
