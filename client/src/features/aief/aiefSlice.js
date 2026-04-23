import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  getAiefFiltersThunk,
  getAllAiefThunk,
  getSavedOpportunityRefsThunk,
} from './aiefThunk';

const initialFiltersState = {
  major: 'All',
  workType: 'All',
  location: '',
  compensation: 'All',
  targetGroup: 'All',
  sort: 'latest',
  deadline: 'All',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
  workTypeOptions: ['All', 'Full-Time', 'Part-Time', 'Remote', 'Internship'],
  compensationOptions: ['All', 'Paid', 'Unpaid', 'Not Mentioned'],
  targetGroupOptions: ['All'],
  majorOptions: ['All'],
};

const initialState = {
  isLoading: false,
  isFiltersLoading: false,
  savedOpportunityIds: [],
  savedOpportunityKeys: [],
  opportunities: [],
  totalJobs: 0,
  numOfPages: 1,
  currentPage: 1,
  ...initialFiltersState,
};

export const getAllAief = createAsyncThunk('aief/getAll', getAllAiefThunk);
export const getAiefFilters = createAsyncThunk(
  'aief/getFilters',
  getAiefFiltersThunk
);
export const getSavedOpportunityRefs = createAsyncThunk(
  'aief/getSavedOpportunityRefs',
  getSavedOpportunityRefsThunk
);

const aiefSlice = createSlice({
  name: 'aief',
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state.currentPage = 1;
      state[name] = value;
    },
    clearFilters: (state) => {
      return {
        ...state,
        major: initialFiltersState.major,
        workType: initialFiltersState.workType,
        location: initialFiltersState.location,
        compensation: initialFiltersState.compensation,
        targetGroup: initialFiltersState.targetGroup,
        sort: initialFiltersState.sort,
        deadline: initialFiltersState.deadline,
        currentPage: 1,
      };
    },
    changePage: (state, { payload }) => {
      state.currentPage = payload;
    },
    markOpportunitySaved: (state, { payload }) => {
      const { opportunityId, opportunityKey } = payload;

      if (
        opportunityId &&
        !state.savedOpportunityIds.includes(opportunityId)
      ) {
        state.savedOpportunityIds.push(opportunityId);
      }

      if (
        opportunityKey &&
        !state.savedOpportunityKeys.includes(opportunityKey)
      ) {
        state.savedOpportunityKeys.push(opportunityKey);
      }
    },
    setFilterOptions: (state, { payload }) => {
      if (payload.majorOptions) state.majorOptions = payload.majorOptions;
      if (payload.targetGroupOptions)
        state.targetGroupOptions = payload.targetGroupOptions;
    },
  },
  extraReducers: {
    [getAllAief.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllAief.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.opportunities = payload.jobs;
      state.totalJobs = payload.totalJobs;
      state.numOfPages = payload.numOfPages;
      state.currentPage = payload.currentPage;
    },
    [getAllAief.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [getAiefFilters.pending]: (state) => {
      state.isFiltersLoading = true;
    },
    [getAiefFilters.fulfilled]: (state, { payload }) => {
      state.isFiltersLoading = false;
      state.majorOptions = payload.filters?.majorOptions || ['All'];
      state.targetGroupOptions = payload.filters?.targetGroupOptions || ['All'];
    },
    [getAiefFilters.rejected]: (state, { payload }) => {
      state.isFiltersLoading = false;
      toast.error(payload);
    },
    [getSavedOpportunityRefs.fulfilled]: (state, { payload }) => {
      state.savedOpportunityIds = payload.savedOpportunityIds || [];
      state.savedOpportunityKeys = payload.savedOpportunityKeys || [];
    },
  },
});

export const {
  handleChange,
  clearFilters,
  changePage,
  markOpportunitySaved,
  setFilterOptions,
} =
  aiefSlice.actions;

export default aiefSlice.reducer;
