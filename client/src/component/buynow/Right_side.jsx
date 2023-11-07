import React,{ useEffect, useState } from 'react'

function Right_side({ item }) {
  const [Price, setPrice] = useState(0); // Initialize 'Price' state

  const totalAmount = () => {
    let price = 0;
    if (Array.isArray(item)) { // Check if 'item' is an array
      item.forEach(item => {
        price += item.price.mrp || 0; // Ensure 'mrp' or default to 0 if undefined
      });
    }
    setPrice(price);
  }

  useEffect(() => {
    totalAmount();
  }, [item]); // Adding 'item' as a dependency for useEffect

  return (
    <div className='my-5 mr-3 '>
        <img src="/images.png" alt="" className=' w-[100%] h-[6vw]'/>
    
    <div className="cost_right bg-white my-3 p-2">
        <p className='text-blue-400 p-2 flex'>Your Order is Eligible for FREE delivery</p>
        <p className='text-[#565959] flex mt-5'>Select the option at checkout. </p> <br /><p  className='text-[#565959] flex'> Details</p>
        <p className='font-bold flex my-10'>Subtotal ({item.length} items) : <span>₹{Price}.00</span></p>
        <button className='bg-yellow-400 p-2 w-full rounded-lg hover:bg-yellow-500'>Proceed to Buy</button>
        <p className='font-semibold my-3 flex'>Emi available</p>
    </div>
    </div>
  )
}

export default Right_side