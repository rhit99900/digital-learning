import { LessonsType } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LessonState {
  lessonInput: string;
  lessons: LessonsType[] | []
}

const initialState: LessonState = {
  lessonInput: '',
  lessons: []
}

export const lessonSlice = createSlice({
  name: 'lesson',
  initialState,
  reducers: {
    setLessonInput: (state, action: PayloadAction<string>) => {
      state.lessonInput = action.payload;
    },
    setLessons: (state, action: PayloadAction<LessonsType[]|[]>) => {
      state.lessons = action.payload;
    }
  }
})

export const { setLessonInput, setLessons } = lessonSlice.actions;

export default lessonSlice.reducer;