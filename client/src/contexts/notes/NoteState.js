import { useState } from "react";
import noteContext from "./noteContext";


const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial)

  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem("token")
        }
      })
      const jsonData = await response.json();
      console.log("Get all the note from the database", jsonData);
      setNotes(jsonData)
    } catch (error) {
      console.log('Error:', error);
    };

  }



  const addNotes = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/addNotes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem("token")
        },
        body: JSON.stringify({ title, description, tag })
      })
      const jsonData = await response.json();
      console.log("Adding a new note to the database", jsonData);
      setNotes([...notes, jsonData]);
    } catch (error) {
      console.log('Error:', error);
    };
  }


  const deleteNotes = async (id) => {
    try {
      const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem("token")
        },
      })
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.log('Error:', error);
    };

    console.log("deleting a note to the database with id : " + id)
    const newNotes = notes.filter((note) => {
      return note._id !== id
    })
    setNotes(newNotes)
  }


  const editNotes = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem("token")
        },
        body: JSON.stringify({ title, description, tag })
      })
      const json = await response.json();
      console.log("note updated in database with id : ", json);
    } catch (error) {
      console.log('Error:', error);
    };
    const originalnotes = notes;
    const copiednotes = JSON.parse(JSON.stringify(originalnotes));
    for (let index = 0; index < copiednotes.length; index++) {
      const element = copiednotes[index];
      if (element._id === id) {
        copiednotes[index].title = title;
        copiednotes[index].description = description;
        copiednotes[index].tag = tag;
        break;
      }
    }
    setNotes(copiednotes)
  }

  return (
    <noteContext.Provider value={{ notes, getNotes, addNotes, deleteNotes, editNotes }}>
      {props.children}
    </noteContext.Provider>)

};

export default NoteState;














































// const NoteState = (props) => {
//     const s1 = {
//         name: "sonu dangi",
//         professional: "student",
//         mobile: 9644813610
//     }
//     const [state, setState] = useState(s1);

//     const update = () => {
//         setTimeout(() => {
//             setState({
//                 name: "jaikee dangi",
//                 professional: "student2",
//                 mobile: 96448136101212122
//             })
//         }, 1000);
//     }
//     return (<noteContext.Provider value={{ state: state, update: update }}>{props.children}</noteContext.Provider>)
// };

// export default NoteState;