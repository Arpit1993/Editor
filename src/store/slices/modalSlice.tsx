import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    showEditorModal: false,
    showHTMLContentModal: false,
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        displayEditorModal: (state) => {
            state.showEditorModal = true;
        },
        hideEditorModal: (state) => {
            state.showEditorModal = false;
        },
        displayHTMLContentModal: (state) => {
            state.showHTMLContentModal = true;
        },
        hideHTMLContentModal: (state) => {
            state.showHTMLContentModal = false;
        }
    },
})


export const { displayEditorModal, hideEditorModal, displayHTMLContentModal, hideHTMLContentModal } = modalSlice.actions

export default modalSlice.reducer