import React from 'react'
import "./footer.css"
import emlBannerLogo from "../../Images/brandKit/eml-banner-logo.png";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <div className="footer-wrap ">
            <div className="footer-basic container">
                <footer>
                    <div className="row ">
                        <div className="col-lg-4 col-md-4  footer-img d-flex justify-content-center align-items-center">
                            <img
                                className="img-fluid"
                                src={emlBannerLogo}
                                alt=""
                            />
                        </div>
                        <div className="col-lg-8 col-md-8 d-flex flex-column justify-content-center align-items-center">
                            <div className="social">
                                <a href="mailto:head@eml-iitm.org"><i className="fa-solid fa-envelope"></i></a>
                                <a href="https://www.youtube.com/c/emliitm"><i className="fa-brands fa-youtube"></i></a>
                                <a href="https://www.instagram.com/emliitm/"><i className="fa-brands fa-instagram"></i></a>
                                <a href="https://www.facebook.com/eml.iitm/"><i className="fa-brands fa-facebook"></i></a>
                                <a href="https://www.linkedin.com/company/eml-iitm/"><i className="fa-brands fa-linkedin"></i></a>
                                <a href="https://twitter.com/iitmadras?lang=en"><i className="fa-brands fa-twitter"></i></a>
                            </div>
                            <ul className="list-inline">
                                <li className="list-inline-item"><a href="https://eml-iitm.netlify.app/">Download Brochure</a></li>
                                <li className="list-inline-item"><a href="#home">Home</a></li>
                                <li className="list-inline-item"><a href="#">Speakers</a></li>
                                <li className="list-inline-item"><a href="#">Gallery</a></li>
                                <li className="list-inline-item"><a href="#">Contact Us</a></li>

                            </ul>
                        </div>

                    </div>

                    <p className="copyright">Developed By EML Webops Team - &copy; {currentYear}</p>
                </footer>
            </div>
        </div >
    )
}


