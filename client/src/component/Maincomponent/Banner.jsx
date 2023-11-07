import React from 'react';
import '@coreui/coreui/dist/css/coreui.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CCarousel, CCarouselItem, CImage } from '@coreui/react';

const data = [
    "/Banner1.jpg",
    "/Banner2.jpg",
    "/Banner3.jpg",
    "/Banner4.jpg"
];

function Banner() {
    return (
        <>
            <style>
                {`
                    .custom-carousel-control {
                        background-color: black;
                        border: 1px solid #ccc;
                        opacity:50%;
                        border-radius: 10px;
                        width: 40px;
                        height: 70px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        position: absolute;
                        top: 24vw;
                        transform: translateY(-50%);
                        z-index: 1;
                    }
                    .custom-carousel-control.left {
                        left: 6vw;
                    }
                    .custom-carousel-control.right {
                        right: 6vw;
                    }
                `}
            </style>
            <div className="custom-carousel-control left">
                <i className="cil-chevron-left"></i>
            </div>
            <div className="custom-carousel-control right">
                <i className="cil-chevron-right"></i>
            </div>
            <CCarousel controls transition="slide">
                {
                    data.map((item, index) => (
                        <CCarouselItem key={index} interval={5000}>
                            <CImage className="d-block w-full h-[30vw]" src={item} alt="slides" />
                        </CCarouselItem>
                    ))
                }
            </CCarousel>
            
        </>
    )
}

export default Banner;
