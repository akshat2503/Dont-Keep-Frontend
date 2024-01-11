import React, { useContext, useEffect, useState } from 'react'
import noteContext from './context/notes/NoteContext'
import Noteitem from './Noteitem';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import notAvlSvg from './notAvl.svg'
import './Notes.css'

export default function Notes(props) {
    const context = useContext(noteContext);
    const { notes, getNotes, addNote } = context;
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    let navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
            // eslint-disable-next-line
        } else {
            navigate("/login");
        }
    }, []);
    const [isVisible, setIsVisible] = useState(false);
    const handleAddNoteFocus = () => {
        setIsVisible(true);
    }
    const handleAddNoteBlur = () => {
        setIsVisible(false);
    }
    const handleAddNoteClick = async () => {
        handleAddNoteBlur();
        if (title.length < 5) toast("Title must be atleast 5 characters !", { position: "bottom-left", autoClose: 2000, hideProgressBar: true, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined, theme: "dark", })
        else if (content.length < 5) toast("Description must be atleast 5 characters !", { position: "bottom-left", autoClose: 2000, hideProgressBar: true, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined, theme: "dark", })
        else {
            await addNote(title, content, '');
            setTitle('');
            setContent('');
        }
    }
    return (
        <>
            <div className="d-flex">
                <ToastContainer />
                <div className="plcc" style={{ height: '90vh', width: `${props.sidebarVisible ? '280px' : '70px'}`, flexShrink: "0" }}></div>
                <div className="sidebar my-2" style={{ height: '90vh', width: `${props.sidebarVisible ? '280px' : '70px'}` }}>
                    <div className="sidebar-item d-flex my-1 align-items-center active-sidebar">
                        <div className="svgDiv ms-2">
                            <svg fill='#ffffffde'>
                                <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 0 1 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"></path>
                            </svg>
                        </div>
                        <p style={{ display: `${props.sidebarVisible ? 'block' : 'none'}` }} className='ms-2'>Notes</p>
                    </div>
                    <div className="sidebar-item d-flex my-1 align-items-center not-active-sidebar">
                        <div className="svgDiv ms-2">
                            <svg fill='#ffffffde'>
                                <path d="M18 17v-6c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v6H4v2h16v-2h-2zm-2 0H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6zm-4 5c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2z"></path>
                            </svg>
                        </div>
                        <p style={{ display: `${props.sidebarVisible ? 'block' : 'none'}` }} className='ms-2'>Reminders</p>
                    </div>
                    {/* <div className="sidebar-item d-flex my-1 align-items-center not-active-sidebar">
                        <div className="svgDiv ms-2">
                            <svg fill='#ffffffde'>
                                <path d="M20.41 4.94l-1.35-1.35c-.78-.78-2.05-.78-2.83 0L13.4 6.41 3 16.82V21h4.18l10.46-10.46 2.77-2.77c.79-.78.79-2.05 0-2.83zm-14 14.12L5 19v-1.36l9.82-9.82 1.41 1.41-9.82 9.83z"></path>
                            </svg>
                        </div>
                        <p style={{ display: `${props.sidebarVisible ? 'block' : 'none'}` }} className='ms-2'>Edit Labels</p>
                    </div> */}
                    <div className="sidebar-item d-flex my-1 align-items-center not-active-sidebar">
                        <div className="svgDiv ms-2">
                            <svg fill='#ffffffde'>
                                <path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.83 1H5.42l.82-1zM5 19V8h14v11H5zm11-5.5l-4 4-4-4 1.41-1.41L11 13.67V10h2v3.67l1.59-1.59L16 13.5z"></path>
                            </svg>
                        </div>
                        <p style={{ display: `${props.sidebarVisible ? 'block' : 'none'}` }} className='ms-2'>Archive</p>
                    </div>
                    <div className="sidebar-item d-flex my-1 align-items-center not-active-sidebar">
                        <div className="svgDiv ms-2">
                            <svg fill='#ffffffde'>
                                <path d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z"></path>
                                <path d="M9 8h2v9H9zm4 0h2v9h-2z"></path>
                            </svg>
                        </div>
                        <p style={{ display: `${props.sidebarVisible ? 'block' : 'none'}` }} className='ms-2'>Trash</p>
                    </div>
                </div>
                <div className="d-flex flex-column" style={{ width: '100%' }}>
                    <div className={`addNoteDiv ${window.innerWidth >= 768 ? "mx-5 my-5" : "my-3"}  d-flex justify-content-center`} style={{ height: `${isVisible ? "20vh" : "8vh"}`, width: `${window.innerWidth >= 768 ? "" : "100%"}` }}>
                        <div className="inputDiv inputDivAddNote py-1 px-3 d-flex flex-column" style={{ height: `${isVisible ? "20vh" : "8vh"}`, width: `${window.innerWidth >= 768 ? "" : "90%"}` }}>
                            <button onClick={handleAddNoteBlur} type="button" className="btn-close btn-close-white my-1" style={{ alignSelf: 'flex-end', position: 'absolute', display: `${isVisible ? "block" : "none"}` }} aria-label="Close"></button>
                            <input value={title} onChange={(e) => setTitle(e.target.value)} onFocus={handleAddNoteFocus} className='addNoteInput addNoteInputFirst nav-input' type="text" placeholder={`${isVisible ? "Title" : "Take a note ..."}`} style={{ fontWeight: `${isVisible ? "500" : "normal"}` }} />
                            <input value={content} onChange={(e) => setContent(e.target.value)} onFocus={handleAddNoteFocus} style={{ display: `${isVisible ? "block" : "none"}` }} className='addNoteInput addNoteInputSecond nav-input' type="text" placeholder='Take a note ...' />
                            <button onClick={handleAddNoteClick} style={{ alignSelf: 'flex-end', display: `${isVisible ? "block" : "none"}` }} className="btn btn-secondary btn-sm mb-1">Submit</button>
                        </div>
                    </div>
                    <div className='row justify-content-center' style={{ maxWidth: "100vw", margin: `${window.innerWidth >= 768 ? "0rem 2rem" : "0rem 1rem"}`, padding: `${window.innerWidth >= 768 ? "0rem 6rem" : "0rem 0rem"}` }}>

                        {notes.length === 0 ? (<div className="noNotesAvl text-center">
                            <img className='mt-3' width="120px" src={notAvlSvg} alt="" style={{filter: "invert(1)", opacity: "0.3"}} />
                            <p className='my-3' style={{fontSize: "1.75rem", fontWeight: "500", opacity: "0.5"}}>No notes to display.</p>
                        </div>) : ""}

                        {notes.map((note) => {
                            return <Noteitem key={note._id} note={note} />
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}
