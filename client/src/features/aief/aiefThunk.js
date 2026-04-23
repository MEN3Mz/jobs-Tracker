import customFetch from '../../utils/axios';

const normalizeDeadlineParam = (deadline = '') => {
  if (!deadline || deadline === 'All') return deadline;

  const trimmedDeadline = deadline.trim();
  const dmyMatch = trimmedDeadline.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);

  if (dmyMatch) {
    const [, day, month, year] = dmyMatch;
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }

  return trimmedDeadline;
};

export const getAiefFiltersThunk = async (_, thunkAPI) => {
  try {
    const resp = await customFetch.get('/aief/filters');
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.msg || 'Unable to load filters'
    );
  }
};

export const getSavedOpportunityRefsThunk = async (_, thunkAPI) => {
  try {
    const resp = await customFetch.get('/jobs/opportunity-refs');
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.msg || 'Unable to load saved opportunities'
    );
  }
};

export const getAllAiefThunk = async (_, thunkAPI) => {
  const {
    currentPage,
    major,
    workType,
    location,
    compensation,
    targetGroup,
    sort,
    deadline,
  } = thunkAPI.getState().aief;

  const normalizedDeadline = normalizeDeadlineParam(deadline);

  const params = new URLSearchParams({
    page: currentPage,
    sort,
    major,
    workType,
    location,
    compensation,
    targetGroup,
    deadline: normalizedDeadline,
  });

  try {
    const resp = await customFetch.get(`/aief?${params.toString()}`);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.msg || 'Unable to load opportunities'
    );
  }
};
