import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobs: [],
  teachers: [],
  courses:[],
  userCourses:[],
  job: null,
  student:null,
  loading: false,
  allQuizzesOneStudent:[],
  allLessonsOneStudent:[],
  purchasedCourses:[],
  error: '',
  message: '',
};

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    fetchJobs: (state, action) => {
        state.jobs = action.payload;
        state.error = '';
        state.message = '';
      },
      fetchTeachers: (state, action) => {
        state.teachers = action.payload;
        state.error = '';
        state.message = '';
      },
      fetchCourses: (state, action) => {
        state.courses = action.payload;
        state.error = '';
        state.message = '';
      },
      saveUserCourses: (state, action) => {
        state.userCourses = action.payload;
        state.error = '';
        state.message = '';
      },
      saveAllQuizzesOneStudent: (state, action) => {
        state.allQuizzesOneStudent = action.payload; 
      },
      saveAllLessonsOneStudent: (state, action) => {
        state.allLessonsOneStudent = action.payload; 
      },
    fetchSingleJob: (state, action) => {
        state.job = action.payload;
      },
      fetchSingleStudent: (state, action) => {
        state.student = action.payload;
      },
      fetchPurchasedCourses: (state, action) => {
        state.purchasedCourses = action.payload;
      },
      isLoading: (state, action) => {
        state.loading = action.payload;
      },


    initiatePending: (state) => {
      state.isLoading = true;
      state.error = '';
      state.message = '';
    },
    clearUser: (state) => {
      return {
        ...initialState,
      };
    },
  },
});

const { actions, reducer } = jobSlice;

export const {
 fetchJobs,
 fetchTeachers,
 fetchSingleJob,
 saveAllLessonsOneStudent,
 saveAllQuizzesOneStudent,
 fetchSingleStudent,
 fetchCourses,
 fetchPurchasedCourses,
 saveUserCourses,
 isLoading,
} = actions;

export default reducer;


