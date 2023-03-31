import React from 'react'

const About = () => {
  return (
    <>
      <div className="container about-component ">
        <h2 className='mb-3'>Overview</h2>
        <div className='mb-5'>
          <p className='mb-1'> Welcome to iNotebook – a simple and convenient way to create, edit, and save notes!
          </p>
          <p className='mb-2'> With iNotebook, you can easily organize your thoughts and ideas in one place. Our website allows you to create notes with titles and text, categorize your notes for easy access,  edit your notes with easily manner and save your notes.</p>
          <p className='mb-2'> We built iNotebook using the MERN stack, which includes MongoDB, Express.js, React, and Node.js. This powerful technology stack allowed us to build a scalable and robust website that can handle a large number of users and notes.</p>
          <p className='mb-2'> Our target audience includes students, professionals, and anyone who needs a way to organize their thoughts and ideas. By using iNotebook, you can increase your productivity, better organize your notes, and access your notes from anywhere.</p>
          <p className='mb-2'> We're always working to improve iNotebook, and have plans to add new features, improve the user interface, and expand our user base in the future. We believe that with iNotebook, you can take your note-taking to the next level!</p>
          <p className='mb-2'> Thank you for choosing iNotebook – we look forward to helping you stay organized and productive!</p>
        </div>
        <hr className='mb-5'/>

        <h2 className='mb-3'>How does it work?</h2>
        <div className='mb-5'>
          <p className='mb-4'> <span className='Overview '>Authentication : </span>  I am created a login and signup button to allow users to create an account or sign in to their existing account. When a user creates an account or logs in, their credentials will be verified on the backend using Node.js and MongoDB. If the credentials are correct, the user will be redirected to the main dashboard of the website.
          </p>

          <p className='mb-4'> <span className='Overview'>Dashboard : </span>  Once a user is logged in, they will be directed to the main dashboard of the website. Here, they will be able to view their existing notes or create new notes. You might use React to create the frontend components of the dashboard, and Express.js to handle the backend logic.</p>

          <p className='mb-4'> <span className='Overview'>Note creation and editing : </span>  When a user clicks on the "Start using now" button, they will be directed to a page where they can create a new note. They will be able to add a title and text to the note, and then save it to their account. When a user clicks on an existing note, they will be directed to a Modals where they can edit the note. They will be able to make changes to the title and text of the note, and then save their changes to their account.</p>

          <p className='mb-4'> <span className='Overview'>Data storage : </span>  When a user creates or edits a note, the data will be stored in a MongoDB database on the backend. You might use Mongoose, which is an Object-Document Mapping (ODM) library for MongoDB and Node.js, to help you store and retrieve data from the database.</p>

        </div>
        <hr className='mb-5' />

        <h2 className='mb-3' >About iNotebook</h2>
        <p className='mb-5'>This web application is a free product, which can be used by any individual, company, school, government office etc. I originally made this for myself to help me remember ideas that will eventually end up on my personal blog. This simple tool that all started as a simple project has helped my productivity immensely and I hope it helps you too.</p>
        <hr className='mb-5' />
        <h2 className='mb-3'>Browser Compatibility</h2>
        <p className='mb-5'>Online iNotebook supports modern web browsers including Google Chrome, Mozilla Firefox, Safari, Opera, Edge, Internet Explorer and Steam browser. You need to enable JavaScript in order to use the app.
        </p>
      </div>
    </>
  )
}

export default About;