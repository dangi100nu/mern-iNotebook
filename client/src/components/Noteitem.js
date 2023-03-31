import React, { useContext } from 'react'
import noteContext from '../contexts/notes/noteContext'

const Noteitem = (props) => {
    const context = useContext(noteContext)
    const { deleteNotes  } = context
    const { note, updateNote, showAlert } = props;

    const handleOnDelete = (e) => {
        e.preventDefault()
        deleteNotes(note._id)  
        showAlert("Notes deleted successfully!!","success")   
    }
    const handleOnUpdate = (e) => {
        e.preventDefault()
        updateNote(note)
    }
    return (
        <>
            <div className="col-md-4">
                <div className="card my-3" >
                    <div className="card-body">
                        <div className="d-flex align-items-center ">
                            <h5 className="card-title overflow-hidden ">{note.title}</h5>
                            <i className="fa-solid fa-trash-can ms-3 me-2" onClick={handleOnDelete}></i>
                            <i className="fa-solid fa-pen-to-square mx-2" onClick={handleOnUpdate}></i>
                        </div>
                        <p className="card-text">{note.description} </p>
                    </div>
                </div>

            </div>


        </>
    )
}

export default Noteitem
