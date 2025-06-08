import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  classroomLectures: { data: any };
} = {
  classroomLectures: { data: null },
};

const classroomLectureSlice = createSlice({
  name: 'classroom-lecture',
  initialState,
  reducers: {
    setClassroomLectures(state, action: PayloadAction<{ data: any }>) {
      console.log(action.payload);
      state.classroomLectures = action.payload;
    },
  },
});

export const { setClassroomLectures } = classroomLectureSlice.actions;
export default classroomLectureSlice.reducer;
