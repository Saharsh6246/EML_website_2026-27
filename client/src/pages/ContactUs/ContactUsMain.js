import React from 'react'
import "./contactus.css"
import Footer from '../../components/Footer/Footer'
export default function ContactUsMain() {
  return (
    <>
      <section id='contactus'>
        <div className="container">

          <div className="title">
            <h1 className='text-center'>Contact Us</h1>
          </div>
          <div className="subtitle text-center">
            <h3>"Extra Mural Lectures:
              A tapestry of
              knowledge woven with
              captivating
              conversations, where
              minds are ignited,
              perspectives are
              expanded, and
              inspiration takes
              flight."</h3>
          </div>

          <div className="row text-center wrapper">
            <div className="col-md-6 headbox">
              <h3> Mahesh Karhale</h3>
              <h4>Student Head | EML IIT Madras</h4>
              <h5>+91 8010984064</h5>
              <h5>head@eml-iitm.org</h5>
            </div>
            <div className="col-md-6 headbox">
              <h3> Arjav Singh</h3>
              <h4>Student Head | EML IIT Madras</h4>
              <h5>+91 9752846316</h5>
              <h5>head@eml-iitm.org</h5>
            </div>
          </div>
        </div>
      <Footer />
      </section>
    </>


  )
}
