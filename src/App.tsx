import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useEditor, EditorContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Link from "@tiptap/extension-link";
import Bold from "@tiptap/extension-bold";
import Underline from "@tiptap/extension-underline";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Code from "@tiptap/extension-code";
import History from "@tiptap/extension-history";
import Modal from './component/Modal';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { addNote, getNotes, updateNote, deleteNote, setEditFlow, unSetEditFlow, setNodeId, clearNoteId, getAllNotesInHTMLFormat } from './store/slices/notesSlice';
import { displayEditorModal, hideEditorModal, displayHTMLContentModal, hideHTMLContentModal } from './store/slices/modalSlice';
import { NotesList } from './component/NotesList';
import { Button } from './component/Button';
import * as Icons from "./component/Icons";
import classNames from "classnames";

const EditorWrapper = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 500px;
  .ProseMirror:focus {
    outline: none;
  }
`;

const Main = styled.main`
  padding: 16px;
`;

const App: React.FC = () => {
  const [text, setText] = useState(null);
  const [url, setUrl] = useState("");
  const [htmlFormat, setHtmlFormat] = useState(null);
  const { listOfNotes, isEditFlow, noteId, allNotesInHTMLFormat } = useSelector((state) => state.notes);
  const { showEditorModal, showHTMLContentModal } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const [modalIsOpen, setIsOpen] = useState(false);
  const editor = useEditor({
    extensions: [
      Document,
      History,
      Paragraph,
      Text,
      Link.configure({
        openOnClick: false
      }),
      Bold,
      Underline,
      Italic,
      Strike,
      Code
    ],
    content: text,
  });
  const openModal = useCallback(() => {
    console.log(editor.chain().focus());
    setUrl(editor.getAttributes("link").href);
    setIsOpen(true);
  }, [editor]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setUrl("");
  }, []);
  const saveLink = useCallback(() => {
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url, target: "_blank" })
        .run();
    } else {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    }
    closeModal();
  }, [editor, url, closeModal]);

  const removeLink = useCallback(() => {
    console.log('removeLink');
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    closeModal();
  }, [editor, closeModal]);

  const toggleBold = useCallback(() => {
    editor.chain().focus().toggleBold().run();
  }, [editor]);

  const toggleUnderline = useCallback(() => {
    editor.chain().focus().toggleUnderline().run();
  }, [editor]);

  const toggleItalic = useCallback(() => {
    editor.chain().focus().toggleItalic().run();
  }, [editor]);

  const toggleStrike = useCallback(() => {
    editor.chain().focus().toggleStrike().run();
  }, [editor]);

  const toggleCode = useCallback(() => {
    editor.chain().focus().toggleCode().run();
  }, [editor]);
  const createNewNote = () => {
    const payload = { content: { textFormat: editor?.getText(), htmlFormat: editor?.getHTML() }, id: uuidv4() };
    dispatch(hideEditorModal())
    editor.commands.clearContent();
    dispatch(addNote(payload));
  };

  const handleSaveEditedNote = () => {
    const payload = { content: { textFormat: editor?.getText(), htmlFormat: editor?.getHTML() }, id: noteId };
    dispatch(updateNote(payload));
    dispatch(unSetEditFlow())
    editor.commands.clearContent();
    dispatch(clearNoteId());
    dispatch(hideEditorModal())
  };

  return (
    <Main>
      <Button type={"primary"} buttonLabel={"Create New Note"} handleClick={() => { dispatch(displayEditorModal()) }} />
      <Button style={{ margin: '0px 16px' }} type={"primary"} buttonLabel={"View Notes(In HTML)"} handleClick={() => { dispatch(displayHTMLContentModal()); dispatch(getAllNotesInHTMLFormat()) }} />
      <Modal isOpen={showEditorModal} onClose={() => { dispatch(hideEditorModal()); editor.commands.clearContent(); }}>
        <div className="menu">
          <button
            className="menu-button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor?.commands.undo()}
          >
            <Icons.RotateLeft />
          </button>
          <button
            className="menu-button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor?.commands.redo()}
          >
            <Icons.RotateRight />
          </button>
          <button
            className={classNames("menu-button", {
              "is-active": editor?.isActive("link")
            })}
            onClick={openModal}
          >
            <Icons.Link />
          </button>
          <button
            className={classNames("menu-button", {
              "is-active": editor?.isActive("bold")
            })}
            onClick={toggleBold}
          >
            <Icons.Bold />
          </button>
          <button
            className={classNames("menu-button", {
              "is-active": editor?.isActive("underline")
            })}
            onClick={toggleUnderline}
          >
            <Icons.Underline />
          </button>
          <button
            className={classNames("menu-button", {
              "is-active": editor?.isActive("intalic")
            })}
            onClick={toggleItalic}
          >
            <Icons.Italic />
          </button>
          <button
            className={classNames("menu-button", {
              "is-active": editor?.isActive("strike")
            })}
            onClick={toggleStrike}
          >
            <Icons.Strikethrough />
          </button>
          <button
            className={classNames("menu-button", {
              "is-active": editor?.isActive("code")
            })}
            onClick={toggleCode}
          >
            <Icons.Code />
          </button>
        </div>
        <EditorWrapper
          onClick={() => {
            editor?.commands.focus();
          }}
        >

          <EditorContent editor={editor} />
        </EditorWrapper>
        <Button type={"primary"} buttonLabel={isEditFlow ? 'Save Edited Note' : 'Create Note'} handleClick={() => isEditFlow ? handleSaveEditedNote() : createNewNote()} />
      </Modal>
      <Modal isOpen={showHTMLContentModal} onClose={() => { dispatch(hideHTMLContentModal()) }}>
        <p>
          {
            allNotesInHTMLFormat && (allNotesInHTMLFormat.map((note) => {
              return (
                <>
                  {
                    note
                  }
                  <br />
                </>
              )
            }))
          }
        </p>
      </Modal>
      <Modal isOpen={modalIsOpen} onClose={() => setIsOpen(false)}>
        <input
          className="modal-input"
          autoFocus
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ width: '100%', height: '50px' }}
        />
        <section>
          <Button type="danger" buttonLabel={"Remove"} handleClick={removeLink} />
          <Button type="primary" buttonLabel={"Save"} handleClick={saveLink} style={{ margin: '0px 8px' }} />

        </section>
      </Modal>
      <NotesList editor={editor} />
    </Main>
  );
};



export default App;
