import { configureStore } from '@reduxjs/toolkit'
import notesReducer from './store/slices/notesSlice';
import modalReducer from './store/slices/modalSlice';

export const store = configureStore({
    reducer: {
        notes: notesReducer,
        modal: modalReducer,
    },
})