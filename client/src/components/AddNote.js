import React, { useContext, useState } from 'react'
import noteContext from '../contexts/notes/noteContext'

const AddNote = (props) => {
    const context = useContext(noteContext)
    const { addNotes } = context
    const [note, setNote] = useState({ title: "", description: "", tag: "default" })

    const handleOnSubmit = (e) => {
        e.preventDefault()
        if (note.title.length < 5) {
            return props.showAlert("title should be atleast 5 characters or more!!", "danger")
        }
        if (note.description.length < 5) {
            return props.showAlert("description should be atleast 5 characters or more!!", "danger")
        }
        addNotes(note.title, note.description, note.tag)  
        setNote({ title: "", description: "", tag: "default" }); 
        props.showAlert("Notes added successfully!!", "success")
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className="container mb-5">
                <h2>Submit Your Notes Here</h2>
                <form >
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label fw-semibold fs-5 ">Title</label>
                        <input type="text" className="form-control" id="title" name='title' value={note.title} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label fw-semibold fs-5">Description</label>
                        <textarea className="form-control" id="description" name='description' rows="6" value={note.description} onChange={onChange} ></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label fw-semibold fs-5 ">Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} />

                    </div>
                    
                    <button type="submit" className="btn btn-primary" onClick={handleOnSubmit} >Add Notes</button>
                </form>
            </div>
        </>
    )
}

export default AddNote
