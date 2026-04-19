import customFetch from '../../utils/axios';

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
    industry,
  } = thunkAPI.getState().aief;

  const params = new URLSearchParams({
    page: currentPage,
    sort,
    major,
    workType,
    location,
    compensation,
    targetGroup,
    deadline,
    industry,
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
