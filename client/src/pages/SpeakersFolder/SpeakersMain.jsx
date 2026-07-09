import React, { useState, useEffect } from "react";
import "./speakers.css";
import SpeakerCard from "./SpeakerCard";
// import SpeakerData from "./SpeakerData"
import Axios from "axios";
import Footer from "../../components/Footer/Footer";

export default function SpeakersMain() {
  const [speakerData, setSpeakerData] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:8000/api/speakers").then((response) => {
      setSpeakerData(response.data);
    });
  }, []);

  const upcomingSpeakers = speakerData.filter(s => s.type === "upcoming");
  const pastSpeakers = speakerData.filter(s => s.type !== "upcoming").sort((a,b) => (b.priority_number || 0) - (a.priority_number || 0));

  return (
    <section className="speakers">
      {upcomingSpeakers.length > 0 && (
        <>
          <h1 className="text-center page-title">Upcoming Speakers</h1>
          <div className="big-wrapper">
            <div className="container">
              <div className="row">
                {upcomingSpeakers.map((e) => (
                  <SpeakerCard data={e} key={e._id} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {pastSpeakers.length > 0 && (
        <>
          <h1 className="text-center page-title" style={{marginTop: upcomingSpeakers.length > 0 ? "50px" : "0"}}>Our Past Speakers</h1>
          <div className="big-wrapper">
            <div className="container">
              <div className="row">
                {pastSpeakers.map((e) => (
                  <SpeakerCard data={e} key={e._id} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      <Footer />
    </section>
  );
}
