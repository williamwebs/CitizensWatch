import React from "react";
import { Link } from "react-router-dom";
import image from "../assets/report3.png";
import image2 from "../assets/report5.png";
import image3 from "../assets/report4.png";
import image4 from "../assets/report1.png";
import "../styles/dashboard.css";
import "../styles/explore.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";

const Explore = () => {
  return (
    <main>
      <div className="container">
        <header>
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            autoplay={{
              delay: 3500,
              stopOnLastSlide: true,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
          >
            <SwiperSlide>
              <div className="row">
                <div className="image">
                  <div className="background"></div>
                  <img src={image} alt="people standing" />
                </div>
                <div className="text">
                  <div className="card">
                    Citizen Watch is a community-driven platform that allows
                    citizens to reportincidents and share important information
                    about safety concerns in their neighbourhoods.
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="row">
                <div className="image">
                  <div className="background"></div>
                  <img src={image2} alt="people standing" />
                </div>
                <div className="text">
                  <div className="card">
                    Our interactive map displays real-time incident reports from
                    around your area, so you can stay informed about potential
                    safety risks in your community. You can click on each pin to
                    view more details about the incident.
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="row">
                <div className="image">
                  <div className="background"></div>
                  <img src={image3} alt="people standing" />
                </div>
                <div className="text">
                  <div className="card">
                    If you witness an incident or have an information that could
                    prevent one, you can submit a report through our easy-to-use
                    form. You can provide details such as the type of incident,
                    location, date/time, and any other relevant information.
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="row">
                <div className="image">
                  <div className="background"></div>
                  <img src={image4} alt="people standing" />
                </div>
                <Link to="/home" className="cta">
                  Report
                </Link>
              </div>
            </SwiperSlide>
          </Swiper>
        </header>
      </div>
    </main>
  );
};

export default Explore;
