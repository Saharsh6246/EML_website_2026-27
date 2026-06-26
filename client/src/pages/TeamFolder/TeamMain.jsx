import React from "react";
import "./team.css";
import TeammateCard from "./TeammateCard";
//import TeammateData from './TeammateData'
import Footer from "../../components/Footer/Footer";
import Carousel from "react-bootstrap/Carousel";
import Team_carousel from "./Team_carousel";
import { useState, useEffect } from "react";
import axios from "axios";

export default function TeamMain() {
  const [teammates, setTeammates] = useState([]);

  useEffect(() => {
    const fetchTeammates = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/team/${new Date().getFullYear()}`
        );
        setTeammates(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching team:", error);
      }
    };
    fetchTeammates();
  }, []);

  return (
    <>
      <section id="team">
        <Carousel fade>
          {Team_carousel.map((image, index) => (
            <Carousel.Item key={index} interval={2000}>
              <img
                src={image}
                alt={`Carousel Image ${index + 1}`}
                className="carousel-image"
              />
            </Carousel.Item>
          ))}
        </Carousel>
        <div className="container">
          <div className="row">
            {teammates.map((teammate) => (
              <TeammateCard data={teammate} key={teammate._id} />
            ))}
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
}
