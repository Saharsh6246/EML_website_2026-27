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

  return (
    <section className="speakers">
      <h1 className="text-center page-title">Our Past Speakers</h1>
      <div className="big-wrapper">
        <div className="container">
          <div className="row">
            {speakerData.map((e) => (
              <SpeakerCard data={e} key={e._id} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}
