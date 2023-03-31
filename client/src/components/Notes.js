import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import noteContext from '../contexts/notes/noteContext'
import AddNote from './AddNote'
import Noteitem from './Noteitem'

const Notes = (props) => {
    const context = useContext(noteContext)
    const { notes, getNotes, editNotes } = context
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            getNotes()
        } else {
            navigate("/login")
        }
        //eslint-disable-next-line
    }, [])       

    const inputRef = useRef(null);
    const closeRef = useRef(null)
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    const updateNote = (currentNote) => {
        inputRef.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })

    }

    const handleOnSubmit = (e) => {
        e.preventDefault()

        editNotes(note.id, note.etitle, note.edescription, note.etag)    
        closeRef.current.click();   
        props.showAlert("Notes updated successfully!!", "success")
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    
    return (
        <>
           
            <AddNote showAlert={props.showAlert} />
            <button ref={inputRef} type="button" className="btn btn-primary d-none" data-bs-toggle="modal"
                data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Notes</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="  mb-3">
                                    <label htmlFor="etitle" className="form-label fw-semibold fs-5 ">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} onChange={onChange} />
                                    
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label fw-semibold fs-5">Description</label>
                                    <textarea className="form-control" id="edescription" name='edescription' rows="6" value={note.edescription} onChange={onChange}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label fw-semibold fs-5 ">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />

                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={closeRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleOnSubmit}>update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row mt-2'>
                <h2 >Your Notes</h2>
                <div className="container mx-2 text-primary">{notes.length === 0 && 'No notes to display'}</div>
                {notes.map((note, index) => {
                    return <Noteitem key={index} updateNote={updateNote} note={note} showAlert={props.showAlert} />
                })}
            </div>
        </>
    )
}

export default Notes
