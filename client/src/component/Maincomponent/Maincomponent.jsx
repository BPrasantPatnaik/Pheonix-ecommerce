import React, { useEffect } from 'react'
import Banner from './Banner'
import Slide from './Slide'
import {getProducts} from '../redux/actions/Action'
import {useDispatch,useSelector} from "react-redux"


function Maincomponent() {

  const {products}=useSelector(state=>state.getproductsdata);
  console.log(products)

  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(getProducts());
  },[dispatch])

  return (
    <div>
      <Banner />
      <div className='Two_comonent flex gap-x-3'>
        <div className='Left_slider w-[70%]'>
          <Slide title="Deal of The Day" products={products}/>
        </div>
        <div className='Right_poster bg-neutral-100'>
          <h4 className='font-bold pt-2'>Festive Latest Launches </h4>
          <img src="/side_pic.jpg" alt="Photo" className='w-[30vw] h-[60vh] p-3' />
          <a href="#" className='relative -top-12 left-2 bg-blue-600 border-solid border-2 p-0.5 rounded-md text-white'>Show more</a>
        </div>
      </div>
      <Slide title="Today's Deal" products={products}/>
      <div className='flex justify-center'>
      <img src="/component_photo.jpg" alt="Picture" className='w-[80%] h-[50vh] '/>
      </div>
     
      <Slide title="Best Seller" products={products}/>
      <Slide title="Upto 80% off" products={products} />
    </div>
  )
}

export default Maincomponent