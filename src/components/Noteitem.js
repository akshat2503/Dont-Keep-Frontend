import React, { useContext, useRef, useState } from 'react'
import noteContext from './context/notes/NoteContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Noteitem.css'

export default function Noteitem(props) {
    const notify = () => {
        toast('Note deleted.', {
            position: "bottom-left",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }
    const context = useContext(noteContext);
    const { deleteNote, editNote } = context;
    const { note } = props;
    const [isHovered, setIsHovered] = useState(false);
    let editedTitle = note.title;
    let editedDescription = note.description;

    const timeoutRef = useRef(null);

    const handleChange = async (name, value) => {
        if (name === 'title') {
            editedTitle = value;
        } else if (name === 'description') {
            editedDescription = value;
        }
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            scheduleEditNote();
        }, 1000);
    }

    const handleDelete = () => {
        deleteNote(note._id);
        notify();
    }

    const scheduleEditNote = () => {
        editNote(note._id, editedTitle, editedDescription);
        clearTimeout(timeoutRef.current);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    return (
        <div className='col-lg-4 col-md-5 col-sm-6 my-3 card-wrapper' style={{ padding: "0px 4px" }}>
            <div className="card cardCss" onMouseEnter={() => { setIsHovered(true) }} onMouseLeave={() => { setIsHovered(false); }}>
                <div className="card-body">
                    <h5 className="card-title" onInput={(e) => handleChange('title', e.currentTarget.innerText)} contentEditable="true" suppressContentEditableWarning={true} spellcheck="false">{note.title}</h5>
                    <p className="card-text" style={{ whiteSpace: 'pre-wrap' }} onInput={(e) => handleChange('description', e.currentTarget.innerText)} contentEditable="true" suppressContentEditableWarning={true} spellcheck="false">{note.description}</p>
                    <div className='mt-3' style={{display: 'flex', alignItems: 'center'}}>
                        <i className="fa-regular fa-trash-can ms-2 me-3 my-2" style={{display: 'inline', opacity: `${isHovered ? "1" : "0"}`, transition: 'all 0.3s' }} onClick={handleDelete}></i>
                        <p style={{ fontSize: '10px', margin: '0', opacity: `${isHovered ? "1" : "0"}`}}>Last edited on: {formatDate(note.date)}</p>
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </div>
    )
}
