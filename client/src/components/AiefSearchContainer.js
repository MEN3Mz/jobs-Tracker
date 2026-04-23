import { useDispatch, useSelector } from 'react-redux';
import Wrapper from '../assets/wrappers/SearchContainer';
import { FormRow, FormRowSelect } from '.';
import { clearFilters, handleChange } from '../features/aief/aiefSlice';

const AiefSearchContainer = () => {
  const {
    isLoading,
    isFiltersLoading,
    major,
    workType,
    location,
    compensation,
    targetGroup,
    sort,
    deadline,
    sortOptions,
    workTypeOptions,
    compensationOptions,
    targetGroupOptions,
    majorOptions,
  } = useSelector((store) => store.aief);

  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearFilters());
  };

  return (
    <Wrapper>
      <form className='form'>
        <h4>opportunities</h4>
        <div className='form-center'>
          <FormRow
            type='text'
            name='location'
            labelText='location'
            value={location}
            handleChange={handleSearch}
          />
          <FormRowSelect
            labelText='major'
            name='major'
            value={major}
            handleChange={handleSearch}
            list={majorOptions}
          />
          <FormRowSelect
            labelText='target group'
            name='targetGroup'
            value={targetGroup}
            handleChange={handleSearch}
            list={targetGroupOptions}
          />
          <FormRowSelect
            labelText='work type'
            name='workType'
            value={workType}
            handleChange={handleSearch}
            list={workTypeOptions}
          />
          <FormRowSelect
            labelText='compensation'
            name='compensation'
            value={compensation}
            handleChange={handleSearch}
            list={compensationOptions}
          />
          <FormRow
            type='text'
            name='deadline'
            labelText='deadline'
            value={deadline === 'All' ? '' : deadline}
            placeholder='d/m/yyyy'
            handleChange={handleSearch}
          />
          <FormRowSelect
            name='sort'
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button
            className='btn btn-block btn-danger'
            disabled={isLoading || isFiltersLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default AiefSearchContainer;
