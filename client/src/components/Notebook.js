import React from 'react'
import Notes from './Notes'

export default function Notebook(props) {
     const {showAlert} = props
  return (
    <>
      <div className="container my-5">
                <Notes showAlert={showAlert} />
      </div>
    </>
  )
}
