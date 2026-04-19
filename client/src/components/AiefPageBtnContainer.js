import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { changePage } from '../features/aief/aiefSlice';

const AiefPageBtnContainer = () => {
  const { numOfPages, currentPage } = useSelector((store) => store.aief);
  const dispatch = useDispatch();

  const pages = Array.from({ length: numOfPages }, (_, index) => index + 1);

  const nextPage = () => {
    let newPage = currentPage + 1;
    if (newPage > numOfPages) {
      newPage = 1;
    }
    dispatch(changePage(newPage));
  };

  const prevPage = () => {
    let newPage = currentPage - 1;
    if (newPage < 1) {
      newPage = numOfPages;
    }
    dispatch(changePage(newPage));
  };

  return (
    <Wrapper>
      <button type='button' className='prev-btn' onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className='btn-container'>
        {pages.map((pageNumber) => {
          return (
            <button
              type='button'
              key={pageNumber}
              className={
                pageNumber === currentPage ? 'pageBtn active' : 'pageBtn'
              }
              onClick={() => dispatch(changePage(pageNumber))}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button type='button' className='next-btn' onClick={nextPage}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default AiefPageBtnContainer;
