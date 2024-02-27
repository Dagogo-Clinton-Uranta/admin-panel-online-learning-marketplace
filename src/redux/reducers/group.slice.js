import { createSlice } from '@reduxjs/toolkit';

const initialState = {
       myGroups: [], 
       allGroups: [], 
       allCategories:[],
       allPacks:[],
       allSectionVideos:[],
       categoryVideos:[],
       subjectsForAdding:[],
       subjectPastExams:[],
       categoryChapters:[],
       chapterSessions:[],
       chapterQuizzes:[],
       correctStudentId:null,
       presentOpenMenu:null,
       presentOpenChapter:null,
       presentOpenSession:null,
       requestedSection:null,
       subjectInfo:{},
       chapterInfo:{},
       teacherInfo:{},
       lessonInfo:{},
       pastExamInfo:{},
       quizInfo:{},
       publicGroups: [], 
       privateGroups: [],
       groupMembers: [], 
       employeer: {}, 
       message: '',
      isLoading: false,
};

const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    saveMyGroup: (state, action) => {
        state.myGroups = action.payload;
    },
    saveAllGroup: (state, action) => {
        state.allGroups = action.payload;
    },
    setRequestedSection: (state, action) => {
      state.requestedSection = action.payload;
   },
    saveSectionVideos: (state, action) => {
      state.allSectionVideos = action.payload;
  },
  saveCorrectStudentId: (state, action) => {
    state.correctStudentId = action.payload;
  },
saveCategoryVideos: (state, action) => {
  state.categoryVideos = action.payload;
},
saveSubjectsForAdding: (state, action) => {
  state.subjectsForAdding = action.payload;
},
saveSubjectPastExams: (state, action) => {
  state.subjectPastExams = action.payload;
},
clearSubjectPastExams: (state, action) => {
  state.subjectPastExams = [];
},
clearSubjectsForAdding: (state, action) => {
  state.subjectsForAdding = [ ];
},
saveCategoryChapters: (state, action) => {
  state.categoryChapters = action.payload;
},
saveChapterSessions: (state, action) => {
  state.chapterSessions = action.payload;
},
saveChapterQuizzes: (state, action) => {
  state.chapterQuizzes = action.payload;
},
savePresentOpenMenu: (state, action) => {
  state.presentOpenMenu = action.payload;
},
savePresentOpenChapter: (state, action) => {
  state.presentOpenChapter = action.payload;
},
savePresentOpenSessions: (state, action) => {
  state.presentOpenSession = action.payload;
},
  saveCategories: (state, action) => {
    state.allCategories = action.payload;
},

savePacks: (state, action) => {
  state.allPacks = action.payload;
},
saveSubjectInfo: (state, action) => {
  state.subjectInfo = action.payload;
},
saveTeacherInfo: (state, action) => {
  state.teacherInfo = action.payload;
},
saveChapterInfo: (state, action) => {
  state.chapterInfo = action.payload;
},
saveQuizInfo: (state, action) => {
  state.quizInfo = action.payload;
},
saveLessonInfo: (state, action) => {
  state.lessonInfo = action.payload;
},
savePastExamInfo: (state, action) => {
  state.pastExamInfo = action.payload;
},
    savePublicGroup: (state, action) => {
        state.publicGroups = action.payload;
    },
    savePrivateGroup: (state, action) => {
        state.privateGroups = action.payload;
    },
    saveGroupMembers: (state, action) => {
      state.groupMembers = action.payload;
  },
    saveEmployeer: (state, action) => {
      state.employeer = action.payload;
  },
    isItLoading: (state, action) => {
      state.isLoading = action.payload;
  },
    clearGroup: (state) => {
      return {
        ...initialState,
      };
    },
  },
});

const { actions, reducer } = groupSlice;

export const {
 saveMyGroup,
 saveAllGroup,
 saveSectionVideos,
 saveCategoryVideos,
 saveCategoryChapters,
 saveSubjectsForAdding,
 saveSubjectPastExams,
 clearSubjectPastExams,
 clearSubjectsForAdding,
 savePresentOpenMenu,
 saveCorrectStudentId,
 savePresentOpenChapter,
 savePresentOpenSessions,
 saveChapterSessions,
 saveChapterQuizzes,
 saveQuizInfo,
 savePublicGroup,
 saveCategories,
 savePacks,
 saveSubjectInfo,
 saveChapterInfo,
 saveTeacherInfo,
 saveLessonInfo,
 savePastExamInfo,
 savePrivateGroup,
 saveGroupMembers,
 saveEmployeer,
 setRequestedSection,
 isItLoading,
 clearGroup
} = actions;

export default reducer;


