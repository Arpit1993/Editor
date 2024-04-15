import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    listOfNotes: {},
    isEditFlow: false,
    noteId: null,
    allNotesInHTMLFormat: null,
}

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        addNote: (state, action) => {
            const { payload } = action;
            state.listOfNotes[payload.id] = payload.content;
        },
        getNotes: (state) => {
            state.listOfNotes;
        },
        updateNote: (state, action) => {
            const { payload } = action;
            state.listOfNotes[payload.id] = {...payload.content};
            
        },
        deleteNote: (state, action) => {
            const { payload } = action;
            delete state.listOfNotes[payload];   
        },
        setEditFlow: (state) => {
            state.isEditFlow = true;
        },
        unSetEditFlow: (state) => {
            state.isEditFlow = false;
        },
        setNoteId: (state, action) => {
            const { payload } = action;
            state.noteId = payload;
        },
        clearNoteId: (state) => {
            state.noteId = null;
        },
        getAllNotesInHTMLFormat: (state) =>{
            let notesListInHTML = [];
            for(let key in state.listOfNotes){
                notesListInHTML.push(state.listOfNotes[key].htmlFormat);
            }
            state.allNotesInHTMLFormat = notesListInHTML;
        }
    },
})

export const { addNote, getNotes, updateNote, deleteNote, setEditFlow, unSetEditFlow, setNoteId, clearNoteId, getAllNotesInHTMLFormat } = notesSlice.actions

export default notesSlice.reducer