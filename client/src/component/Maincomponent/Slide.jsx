import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Divider } from '@mui/material';
import { NavLink } from 'react-router-dom';
//import { products } from './Productdata';

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

function Slide(props) {
    return (
        <div className='m-2 p-1 bg-white'>

            <div className='Product_section flex justify-between m-2 '>

                <h2 className='Product_deal flex justify-start font-bold'>{props.title}</h2>
                <button className='flex justify-end bg-blue-600 rounded-md p-1 hover:bg-blue-500 text-slate-200'>View All</button>

            </div>
            <hr className="my-1 h-0.5 border-t-0 bg-black opacity-100 dark:opacity-50" />
            <div className='Product m-5'>
                <Carousel
                    swipeable={true}
                    responsive={responsive}
                    infinite={true}
                    draggable={false}
                    showDots={false}
                    autoPlay={true}
                    autoPlaySpeed={4000}
                    keyBoardControl={true}
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    centerMode={true}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"

                >
                    {
                        props.products.map(key=>{
                            return(
                                <NavLink to={`/getproductsone/${key.id}`} element>
                                    <div className='Product_items flex-col justify-between'>
                                    <div className='Product_img flex justify-center'>
                                        <img src={key.url} alt="Product" className='w-[10vw]'/>
                                    </div>
                                    <p className='Product_name flex justify-center'>{key.title.shortTitle}</p>
                                    <p className='Products_offer flex justify-center'>{key.discount}</p>
                                    <p className='Product_explore flex justify-center'>{key.tagline}</p>
                                </div>
                                </NavLink>
                                
                            )
                        })
                    }
                </Carousel>
            </div>
        </div>
    )
}

export default Slide