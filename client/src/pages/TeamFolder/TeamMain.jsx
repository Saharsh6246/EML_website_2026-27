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
  const [allTeammates, setAllTeammates] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchTeammates = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/team");
        setAllTeammates(response.data);
      } catch (error) {
        console.error("Error fetching team:", error);
      }
    };
    fetchTeammates();
  }, []);

  const teammates = allTeammates.filter(t => t.year === selectedYear);

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

        <div className="filter-container" style={{ textAlign: "center", margin: "30px 0" }}>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
          >
            {[...new Set(allTeammates.map(t => t.year)), new Date().getFullYear()]
              .sort((a,b)=>b-a)
              .filter((v,i,a)=>a.indexOf(v)===i)
              .map(year => (
                <option key={year} value={year}>{year} Team</option>
            ))}
          </select>
        </div>

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
