import React from "react";
import "./HomeSnap.css";
import HomeHero from "./HomeHero";
import HomeContent from "./HomeContent";
import Footer from '../../components/Footer/Footer'

export default function HomeSnap() {
  return (
    <>



      <div className="snap-wrap">
        {<HomeHero />}
        <div className="sub-wrap">
          <section className="diro"  >
            {/* // this is animate on scroll library  */}
            <div className="container " >
              <div className="row" data-aos="fade-up" data-aos-offset="50" data-aos-duration="500">

                <div className="col-md-6 order-md-2 order-1">
                  <h2>Message From Director</h2>
                  <h1>{HomeContent[0].title}</h1>
                  <h4>Director, IIT Madras</h4>
                </div>

                <div className="col-md-6 img-class order-md-1 order-2">
                  <img className="img-fluid diropic rounded" src="https://images.indianexpress.com/2022/02/Prof.-Kamakoti-Veezhinathan-who-took-charge-as-the-New-Director-of-IIT-Madras-on-17th-January-2022.jpg" alt="" />
                </div>
              </div>
              <div data-aos="fade-up" data-aos-duration="900" data-aos-offset="150"
              >
                <h4>&#x275D; {HomeContent[0].content[0]}</h4>
                <h4> "{HomeContent[0].content[1]}&#x275E;</h4>
              </div>

            </div>
          </section>

          <section className="about">
            <div className="container">
              <div data-aos="fade-up" data-aos-offset="200" data-aos-duration="500">
                <h1>{HomeContent[1].title} </h1>
              </div>
              <div data-aos="fade-up" data-aos-duration="900" data-aos-offset="250">
                <h4>{HomeContent[1].content} </h4>
              </div>

            </div>
          </section>

          <section className="vision">
            <div className="container">
              <div data-aos="fade-up" data-aos-offset="200" data-aos-duration="500">
                <h1 >{HomeContent[2].title} </h1 >
              </div>
              <div data-aos="fade-up" data-aos-duration="900" data-aos-offset="250">
                <h4>{HomeContent[2].content[0]} </h4>
                <h4>{HomeContent[2].content[1]} </h4>
                <h4>{HomeContent[2].content[2]} </h4>
              </div>
            </div>

          <Footer />
          </section>
        </div>

      </div>
    </>
  );
}
