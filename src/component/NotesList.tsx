import styled, { css } from "styled-components";
import { useState } from "react";
import { Cards } from "./Cards";
import { useSelector, useDispatch } from 'react-redux';
import { setEditFlow, unSetEditFlow, deleteNote, setNoteId } from '../store/slices/notesSlice';
import { displayEditorModal, hideEditorModal } from '../store/slices/modalSlice';

const NotesListContainer = styled.div`
    background-color: #eeeeee;
    display: flex;
    flex-wrap: wrap;
    padding: 16px;
    gap: 28px;
    border-radius: 8px;
    margin: 24px 0px;
`;

export const NotesList = ({ editor }) => {
    const { listOfNotes:notes } = useSelector((state) => state.notes);
    const dispatch = useDispatch();
    const handleViewClick = (note, id) => {
        dispatch(setEditFlow())
        editor.commands.setContent(note.htmlFormat);
        dispatch(setNoteId(id));
        dispatch(displayEditorModal())
    };

    const handleDeleteClick = (id) => {
        dispatch(deleteNote(id));
    }
    if (!Object.keys(notes)) {
        return;
    }
    const listOfKeys = Object.keys(notes);
    return (
        <NotesListContainer>
            {listOfKeys.map((key) => {
                return (
                    <Cards 
                        id={key} 
                        note={notes[key]} 
                        onViewClick={handleViewClick}
                        onDeleteClick={handleDeleteClick}
                    />
                )
            })}
        </NotesListContainer>
    )
}