import React, { useEffect, useState } from 'react'

function Subtotal({ item }) { // Destructure 'item' from props

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
    <div className='flex m-4 justify-end'>
        <p>Subtotal ({item.length} item ) : <span className='font-bold'>₹{Price}.00</span></p>
    </div>
  )
}

export default Subtotal