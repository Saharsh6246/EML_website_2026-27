import React from 'react'
import "./gallery.css"
import ReactGallery from "./ReactGallery"
import Footer from '../../components/Footer/Footer'



export default function GalleryMain() {
    return (
        <>
            <section id="gallery">
            {/* <div className="container"> */}
                
                <ReactGallery /> 
            {/* </div> */}
            </section>
            {/* <Footer /> */}
        </>
    )
}
