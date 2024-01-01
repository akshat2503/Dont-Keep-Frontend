import React, { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {
    const host = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
    const notesInitial = [];

    const [notes, setNotes] = useState(notesInitial);

    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        console.log(json);
        setNotes(json.reverse());
    }

    const addNote = async (title, description, tag) => {
        // To be done
        if (tag === '') tag="personal"
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        const newNote = await response.json();
        console.log(newNote);
        setNotes([newNote, ...notes]);
    }

    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = response.json();
        console.log(json)
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
    }

    const editNote = async (id, title, description, tag) => {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        for (let index=0; index<notes.length; index++){
            const element = notes[index];
            if (element._id === id){
                notes[index].title = title;
                notes[index].description = description;
            }
        }
        const json = response.json();
        console.log(json);
    }
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;