import React from 'react'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <>
      <section className="home1 ">
        <h1 className='mb-4 '>Free browser-based iNotebook</h1>
        <p>A simple online tool that makes taking down notes easier and more convenient.</p>
        <p className='mb-4'>Click below to create new notes and edit your saved notes.</p>
        <Link className="btn btn-primary" to="/notebook">Start using now</Link>
      </section>

      <section className='home2'>
        <div className="container">
          <div className="row">

            <div className="col-lg-4 p-5  text-center">
            <i class="fa-solid fa-desktop text-primary"></i>
              <h3> Easy to use interface</h3>
              <p > Our website has a user-friendly interface that allows users to quickly and easily create, edit, and delete notes.</p>
            </div>

            <div className="col-lg-4 p-5 text-center">
              <i className="fa-solid fa-user text-primary"></i>
              <h3>Secure login and signup</h3>
              <p> Our website uses advanced security measures to protect users' personal information and prevent unauthorized access.</p>
            </div>
            <div className="col-lg-4 p-5 text-center">
            <i class="fa-solid fa-server text-primary"></i>
              <h3>Cloud storage</h3>
              <p>All notes created by users are securely stored in the cloud, allowing them to be accessed from any device with an internet connection.</p>

            </div>
            <div className="col-lg-4 p-5 text-center">
              <i className="fa-solid fa-database text-primary"></i>
              <h3> Scalable database </h3>
              <p>With a database, our website can support an unlimited number of users without running into issues like slow loading times or crashes. </p>
            </div>

            <div className="col-lg-4 p-5 text-center">
              <i className="fa-solid fa-mobile-screen-button text-primary"></i>
              <h3>Mobile-friendly</h3>
              <p> Our website is optimized for mobile devices, making it easy to access and use on-the-go.</p>

            </div>
            <div className="col-lg-4 p-5 text-center">
            <i class="fa-solid fa-pen-to-square text-primary"></i>
              <h3> Regular updates</h3>
              <p>Our website is regularly updated with new features and improvements based on user feedback, ensuring that it stays current and meets the evolving needs of its users.</p>

            </div>
          </div>

        </div>
      </section>

    </>
  )
}
export default Home
