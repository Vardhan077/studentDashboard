import { configureStore } from '@reduxjs/toolkit';

// studentSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Redux slice for student data
export const studentSlice = createSlice({
  name: "students",
  initialState: [],
  reducers: {
    setStudents: (state, action) => action.payload,
    addStudent: (state, action) => [...state, action.payload],
    updateStudent: (state, action) => {
      const index = state.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) state[index] = action.payload;
    },
    deleteStudent: (state, action) =>
      state.filter((s) => s.id !== action.payload),
  },
});

export const { setStudents, addStudent, updateStudent, deleteStudent } =
  studentSlice.actions;

export const store = configureStore({
  reducer: { students: studentSlice.reducer },
});