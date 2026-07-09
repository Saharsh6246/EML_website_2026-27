import React, { useState, useEffect } from 'react'
import axios from 'axios'
import "./contactus.css"
import Footer from '../../components/Footer/Footer'
import TeammateCard from '../TeamFolder/TeammateCard'

export default function ContactUsMain() {
  const [teammates, setTeammates] = useState([]);

  useEffect(() => {
    const fetchTeammates = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/team/${new Date().getFullYear()}`
        );
        setTeammates(response.data);
      } catch (error) {
        console.error("Error fetching team:", error);
      }
    };
    fetchTeammates();
  }, []);

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
          
          <h2 className="text-center" style={{marginTop: "50px", marginBottom: "30px"}}>Our Team</h2>
          <div className="row">
            {teammates.map((teammate) => (
              <TeammateCard data={teammate} key={teammate._id} />
            ))}
          </div>

        </div>
      <Footer />
      </section>
    </>
  )
}
